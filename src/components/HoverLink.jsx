export default function HoverLink({ link, imgUrl }) {
  return (
    <div>
      <a
        href="https://www.instagram.com/appopener_"
        target="_blank"
        title="instagram"
        rel="noreferrer"
      >
        <img
          src={imgUrl}
          alt="instagram"
          style={{ height: "60px", width: "60px" }}
        />
      </a>
    </div>
  );
}
