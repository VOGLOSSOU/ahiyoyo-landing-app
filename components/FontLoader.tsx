import Script from "next/script";

export default function FontLoader() {
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/js/all.min.js"
        strategy="beforeInteractive"
      />
    </>
  );
}