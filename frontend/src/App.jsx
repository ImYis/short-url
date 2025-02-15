// frontend/src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('https://0e.pw/api/create', { url });
    setResult(response.data);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4">
      {/* GitHub 风格导航栏 */}
      <nav className="bg-[#161b22] p-4 rounded mb-6 border border-[#30363d]">
        <h1 className="text-2xl font-semibold">0e.pw</h1>
      </nav>

      {/* 生成短链表单 */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="输入长链接"
            className="w-full p-2 bg-[#0d1117] border border-[#30363d] rounded outline-none focus:ring-2 focus:ring-[#238636]"
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-[#238636] hover:bg-[#2ea043] rounded transition-colors"
          >
            生成短链
          </button>
        </form>

        {/* 结果显示（GitHub 卡片风格） */}
        {result && (
          <div className="border border-[#30363d] rounded p-4 bg-[#161b22]">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#238636]">短链已生成：</span>
              <a
                href={result.shortUrl}
                className="text-[#58a6ff] hover:underline"
              >
                {result.shortUrl}
              </a>
            </div>

            {/* 统计信息展示（类似 GitHub 的代码块） */}
            <SyntaxHighlighter
              language="json"
              style={atomDark}
              className="rounded"
            >
              {JSON.stringify(result, null, 2)}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
}
