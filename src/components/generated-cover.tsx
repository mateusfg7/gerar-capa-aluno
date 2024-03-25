import Image from "next/image";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { domToPng } from "modern-screenshot";
import { Loader2, DownloadCloud, X } from "lucide-react";

import { FormSchema } from "~/lib/form-schema";
import model from "~/assets/model.png";

import { Button } from "./ui/button";

type Props = {
  values: FormSchema;
  toggleModal: () => void;
};
export function GeneratedCover({ values, toggleModal }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    aluno,
    curso,
    diasDeAula,
    fimDoHorario,
    inicioDoCurso,
    inicioDoHorario,
    senha,
    usuario,
  } = values;

  const formattedDiasDeAula = () => {
    if (diasDeAula.length === 0) {
      return "";
    }

    if (diasDeAula.length === 1) {
      return diasDeAula[0];
    }

    if (diasDeAula.length === 2) {
      return diasDeAula.join(" e ");
    }

    return diasDeAula.join(", ");
  };

  const padZero = (num: number) => (num < 10 ? `0${num}` : num);
  const formattedDate = (date: Date) =>
    `${padZero(date.getDate() + 1)}/${padZero(date.getMonth() + 1)}/${String(
      date.getFullYear()
    ).slice(2)}`;

  const printRef = useRef<HTMLDivElement>(null);
  async function handleDownload() {
    if (!printRef.current) return;

    flushSync(() => {
      setIsDownloading(true);
    });

    const element = printRef.current;

    console.log(element);

    await domToPng(element).then((data) => {
      const link = document.createElement("a");
      link.href = data;
      link.download = `${aluno}.png`;
      link.click();
    });

    setIsDownloading(false);
    toggleModal();
  }

  const InformationSquare = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{ top: "34%", bottom: "18%", left: "26.3%", right: "29.5%" }}
      className="absolute"
    >
      <div className="w-full h-full relative">{children}</div>
    </div>
  );

  return (
    <div className="fixed bg-black/80 inset-0">
      <div
        style={{ width: isDownloading ? "max-content" : "100%" }}
        className="relative h-full flex items-center justify-center"
      >
        <div
          ref={printRef}
          style={{
            height: isDownloading ? "2000px" : "95vh",
            width: isDownloading ? "3182px" : "auto",
            fontSize: isDownloading ? "calc(2000px/31)" : "calc(95vh/31)",
          }}
          className="relative flex items-center font-bold text-black"
        >
          <Image
            src={model}
            alt="Cover Model"
            className="object-contain w-full h-full"
          />

          <InformationSquare>
            <span className="absolute top-[6%] left-[19%] right-[6%] whitespace-nowrap overflow-hidden text-ellipsis">
              {aluno}
            </span>

            <span className="absolute flex justify-between top-[20.8%] left-[22%] right-[6%]">
              <span>{usuario}</span>
              <span>
                <span className="font-normal">Senha:</span> <span>{senha}</span>
              </span>
            </span>

            <span
              style={{
                fontSize: isDownloading ? "calc(2000px/38)" : "calc(95vh/38)",
              }}
              className="absolute top-[36%] left-[19%] right-[6%] whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {curso}
            </span>

            <span className="absolute top-[50.5%] left-[32%] right-[6%]">
              {formattedDiasDeAula()}
            </span>

            <span className="absolute top-[65%] left-[37%] right-[50%]">
              {inicioDoHorario}
            </span>

            <span className="absolute top-[65%] left-[84%] right-[6%]">
              {fimDoHorario}
            </span>

            <span
              style={{
                fontSize: isDownloading ? "calc(2000px/37)" : "calc(95vh/37)",
              }}
              className="absolute top-[81%] left-[32.5%] right-[51%]"
            >
              {formattedDate(inicioDoCurso)}
            </span>
          </InformationSquare>
        </div>
      </div>
      <div className="fixed left-1/2 -translate-x-1/2 bottom-10 flex gap-2">
        <Button
          disabled={isDownloading}
          onClick={toggleModal}
          variant="ghost"
          className="flex gap-2"
        >
          <X size="1rem" />
          <span>Close</span>
        </Button>
        <Button
          disabled={isDownloading}
          onClick={handleDownload}
          className="flex gap-2"
        >
          {isDownloading ? (
            <Loader2 className="animate-spin" size="1rem" />
          ) : (
            <DownloadCloud size="1rem" />
          )}
          <span>Download</span>
        </Button>
      </div>
    </div>
  );
}
