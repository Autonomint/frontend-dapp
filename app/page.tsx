import WalletOrContent from "@/components/WalletOrContent/WalletOrContent";




export default function Home() {
  return (
    <>
      {/* <div className="flex px-4 py-5">
          {headerItems2nd.map((item, index) => (
            <HeaderItems
              key={index}
              props={{ textHeadline: item.headline, textValue: item.value }}
            />
          ))}
        </div> */}
      {/* Main area */}
      <WalletOrContent/>
    </>
  );
}
