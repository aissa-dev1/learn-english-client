interface Props {
  firstText: string;
  secondText: string;
}

export default function ProfileItem({ firstText, secondText }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold">{firstText}</h3>
      <p className="text-sm font-bold">{secondText}</p>
    </div>
  );
}
