document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('nameInput');
    const status = document.getElementById('status');
  
    // 保存済みの名前を読み込む
    chrome.storage.sync.get(['defaultName'], (result) => {
      if (result.defaultName) {
        input.value = result.defaultName;
      }
    });
  
    document.getElementById('saveBtn').addEventListener('click', () => {
      const name = input.value;
      chrome.storage.sync.set({ defaultName: name }, () => {
        status.textContent = '✅ 保存しました';
        setTimeout(() => status.textContent = '', 1500);
      });
    });
  });
  