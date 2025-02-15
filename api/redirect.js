const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
    const { code } = req.query;
    
    const { data, error } = await supabase
        .from('links')
        .select('original_url')
        .eq('code', code)
        .single();

    if (error || !data) return res.status(404).send('链接不存在');
    
    // 301永久重定向
    res.setHeader('Cache-Control', 's-maxage=86400');
    return res.redirect(301, data.original_url);
};
