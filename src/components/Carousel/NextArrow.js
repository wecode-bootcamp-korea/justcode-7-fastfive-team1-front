import './NextArrow.css';
export default function NextArrow({
  className,
  style,
  onClick,
}: NextArrowProps) {
  return <div className={className} onClick={onClick} />;
}
