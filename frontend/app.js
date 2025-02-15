async function generateLink() {
    const url = document.getElementById('originalUrl').value;
    const spinner = document.getElementById('spinner');
    const resultDiv = document.getElementById('result');

    if (!url) return;
    
    spinner.style.display = 'inline-block';
    try {
        const res = await fetch('/api/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        
        const data = await res.json();
        resultDiv.innerHTML = `
            <div class="flash flash-success">
                <strong>短链接生成成功！</strong><br>
                <input class="form-control mt-2" value="https://0e.pw/${data.code}" readonly>
                <button class="btn btn-sm btn-outline mt-2" onclick="copyLink()">复制</button>
            </div>
        `;
        resultDiv.classList.remove('hidden');
    } catch (err) {
        resultDiv.innerHTML = `<div class="flash flash-error">生成失败，请重试</div>`;
        resultDiv.classList.remove('hidden');
    } finally {
        spinner.style.display = 'none';
    }
}

function copyLink() {
    const input = document.querySelector('#result input');
    input.select();
    document.execCommand('copy');
}
