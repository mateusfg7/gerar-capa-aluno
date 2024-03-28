import Image from "next/image";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { domToPng } from "modern-screenshot";
import { Loader2, DownloadCloud, X } from "lucide-react";

import { FormSchema } from "~/lib/form-schema";
import model from "~/assets/model.png";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";

type Props = {
  values: FormSchema;
  toggleModal: () => void;
};
export function GeneratedCover({ values, toggleModal }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const padZero = (num: number) => (num < 10 ? `0${num}` : num);
  const formattedDate = (date: Date) =>
    `${padZero(date.getDate() + 1)}/${padZero(date.getMonth() + 1)}/${String(
      date.getFullYear()
    ).slice(2)}`;

  const weeklyDays = [
    {
      id: "seg",
      short: "Seg",
      mid: "Segunda",
      long: "segunda-feira",
    },
    {
      id: "ter",
      short: "Ter",
      mid: "Terça",
      long: "terça-feira",
    },
    {
      id: "qua",
      short: "Qua",
      mid: "Quarta",
      long: "quarta-feira",
    },
    {
      id: "qui",
      short: "Qui",
      mid: "Quinta",
      long: "quinta-feira",
    },
    {
      id: "sex",
      short: "Sex",
      mid: "Sexta",
      long: "sexta-feira",
    },
    {
      id: "sab",
      short: "Sab",
      mid: "Sábado",
      long: "sábado",
    },
  ];
  const formattedDiasDeAula = () => {
    const days = weeklyDays.filter((day) => diasDeAula.includes(day.id));

    if (diasDeAula.length === 0) {
      return "";
    }

    if (diasDeAula.length === 1) {
      return days[0].long;
    }

    if (diasDeAula.length === 2) {
      return days.map((day) => day.mid).join(" e ");
    }

    const firstDays = days.slice(0, -1);
    const lastDay = days.slice(-1)[0];

    if (diasDeAula.length === 3) {
      return firstDays.map((day) => day.mid).join(", ") + " e " + lastDay.mid;
    }

    return firstDays.map((day) => day.short).join(", ") + " e " + lastDay.short;
  };

  const formattedHorario = () => {
    let inicio: string;
    let fim: string;

    const splittedInicio = inicioDoHorario.split(":");
    const splittedFim = fimDoHorario.split(":");

    if (splittedInicio[1] === "00") {
      inicio = splittedInicio[0] + "h";
    } else {
      inicio = splittedInicio.join(":");
    }

    if (splittedFim[1] === "00") {
      fim = splittedFim[0] + "h";
    } else {
      fim = splittedFim.join(":");
    }

    return {
      inicio,
      fim,
    };
  };

  const getCourseFontSize = () => {
    let divisor = 38;

    if (curso.length < 30) divisor = 31;
    else if (curso.length < 36) divisor = curso.length + 2;

    if (isDownloading) return `calc(2000px/${divisor})`;
    else return `calc(95vh/${divisor})`;
  };

  const printRef = useRef<HTMLDivElement>(null);
  async function handleDownload() {
    if (!printRef.current) return;

    flushSync(() => {
      setIsDownloading(true);
    });

    const element = printRef.current;

    console.log(element);

    await domToPng(element)
      .then((data) => {
        const link = document.createElement("a");
        link.href = data;
        link.download = `${aluno}.png`;
        link.click();

        toast.success("Imagem baixada com sucesso!");
      })
      .catch((e) => {
        toast.error("Erro ao baixar imagem.");
        console.log(e);
      });

    setIsDownloading(false);
    toggleModal();
  }

  const InformationSquare = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{ top: "34%", bottom: "18%", left: "26.3%", right: "29.5%" }}
      data-loading={isLoading}
      className="absolute data-[loading='true']:hidden"
    >
      <div className="w-full h-full relative">{children}</div>
    </div>
  );

  return (
    <div className="fixed bg-black/50 inset-0">
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
            data-loading={isLoading}
            onLoadingComplete={() => setIsLoading(false)}
            alt="Cover Model"
            className="object-contain w-full h-full data-[loading='true']:opacity-0"
          />

          {isLoading && (
            <>
              <Skeleton className="w-full h-full absolute rounded-2xl bg-secondary/50" />
              <div className="w-full h-full absolute flex rounded-2xl justify-center items-center text-secondary-foreground backdrop-blur">
                <span>Gerando imagem...</span>
              </div>
            </>
          )}

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
                fontSize: getCourseFontSize(),
              }}
              className="absolute top-[36%] left-[19%] right-[6%] whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {curso}
            </span>

            <span className="absolute top-[50.5%] left-[32%] right-[6%]">
              {formattedDiasDeAula()}
            </span>

            <span className="absolute top-[65%] left-[36%] right-[50%] text-center">
              {formattedHorario().inicio}
            </span>

            <span className="absolute top-[65%] left-[84%] right-[6%] text-center">
              {formattedHorario().fim}
            </span>

            <span
              style={{
                fontSize: isDownloading ? "calc(2000px/38)" : "calc(95vh/38)",
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
          disabled={isDownloading || isLoading}
          onClick={toggleModal}
          variant="ghost"
          className="flex gap-2 dark:text-secondary dark:hover:text-secondary-foreground"
        >
          <X size="1rem" />
          <span>Fechar</span>
        </Button>
        <Button
          disabled={isDownloading || isLoading}
          onClick={handleDownload}
          className="flex gap-2"
        >
          {isDownloading ? (
            <Loader2 className="animate-spin" size="1rem" />
          ) : (
            <DownloadCloud size="1rem" />
          )}
          <span>Baixar</span>
        </Button>
      </div>
    </div>
  );
}
