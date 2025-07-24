
interface MenuItemProps {
  label: string;
  children?: React.ReactNode;
  value?: string;
  onClick: () => void;
}

const MenuItem = ({ label, children, value, onClick }: MenuItemProps) => {
  return (
    <div className="flex items-center justify-between bg-[#593187] w-full cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-3 justify-start">
        <p className="text-white h-4 w-4">{children}</p>
        <h5 className="font-spartan text-white text-left text-sm">{label}</h5>
      </div>
      <div className="flex items-center justify-end">
        {value && <button className="text-[#7BE3E9] text-sm font-medium text-right" onClick={onClick}>{value}</button>}
      </div>
    </div>
  );
}

export default MenuItem;