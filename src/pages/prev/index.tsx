import { JXGBoard } from "@/components/JXGBoard/JXGBoard";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Title } from "@/layouts/UniversalHead";
const PrevPage = () => {
  return (
    <>
      <Title>Tags</Title>
      <DefaultLayout>
        <div className="h-[800px]">
          <JXGBoard
            jessieCode
            logic="
A = point(1, 0);
B = point(-1, 0);
C = point(0.2, 1.5);
            "
          />
        </div>
      </DefaultLayout>
    </>
  );
};

export default PrevPage;
