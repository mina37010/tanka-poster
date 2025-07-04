const params = new URLSearchParams(window.location.search);
const tanka = params.get("tanka");

if (tanka) {
  setTimeout(() => {
    const input = document.querySelector('input#tanka');
    if (input) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeInputValueSetter.call(input, tanka);
      input.dispatchEvent(new Event('input', { bubbles: true }));

      console.log("✅ 入力成功: " + tanka);
    } else {
      console.warn("⚠ 入力フィールドが見つかりませんでした");
    }
  }, 500); // ページが安定するのを少し待つ
}
