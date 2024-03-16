function SettingTile({ icon, text, onClick }) {
  return (
    <div
      className="flex row w-100 g-20 centery cursor-pointer hover-primary p-10 br"
      onClick={onClick}
    >
      {icon}
      <p>{text}</p>
    </div>
  );
}

export default SettingTile;
