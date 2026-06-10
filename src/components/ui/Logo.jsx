const Logo = ({ size = 32 }) => {
  return (
    <div className="logo">
      <img
        src="/logo1.png"
        alt="Butterfly Gallery"
        decoding="async"
        style={{ width: size, height: 'auto', display: 'block' }}
      />
    </div>
  );
};

export default Logo;