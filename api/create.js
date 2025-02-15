const { createClient } = require('@supabase/supabase-js');
const { customAlphabet } = require('nanoid');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

const alphabet = '6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz';
const nanoid = customAlphabet(alphabet, 5);

module.exports = async (req, res) => {
    const { url } = JSON.parse(req.body);
    
    // 验证URL格式
    try {
        new URL(url);
    } catch {
        return res.status(400).json({ error: '无效的URL' });
    }

    // 生成唯一短码
    let code;
    do {
        code = nanoid();
    } while (
        (await supabase.from('links').select().eq('code', code)).data.length > 0
    );

    // 存入数据库
    const { error } = await supabase
        .from('links')
        .insert([{ code, original_url: url }]);

    if (error) return res.status(500).json({ error: '数据库错误' });

    return res.status(200).json({ code });
};
