"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

import { FormSchema, formSchema } from "~/lib/form-schema";
import { GeneratedCover } from "~/components/generated-cover";
import { ThemeToggle } from "~/components/theme-toggle";

export default function Home() {
  // const [values, setValues] = useState<FormSchema>({
  //   aluno: "Mateus Felipe Gonçalves",
  //   usuario: "mateusfelipe",
  //   senha: "1234",
  //   curso: "Montagem e Manutenção | Dev. Games | Aux. Administrativo",
  //   diasDeAula: ["Seg", "Ter"],
  //   inicioDoHorario: "08:00",
  //   fimDoHorario: "10:00",
  //   inicioDoCurso: new Date(),
  // });
  const [values, setValues] = useState<FormSchema>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aluno: "",
      usuario: "",
      senha: "1234",
      curso: "",
      diasDeAula: ["Seg"],
      inicioDoHorario: "",
      fimDoHorario: "",
      inicioDoCurso: new Date(),
    },
  });

  function onSubmit(values: FormSchema) {
    setValues(values);
    setIsModalOpen(true);
  }

  return (
    <div className="max-w-lg m-auto">
      <div className="p-6 w-full rounded-md">
        <header className="flex items-center justify-between mb-10">
          <h1 className="text-xl font-bold">
            Gerar Capa Alunos{" "}
            <span className="text-primary">Instituto Mix</span>
          </h1>
          <ThemeToggle />
        </header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-md"
          >
            <FormField
              control={form.control}
              name="aluno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aluno</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome Completo" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nome completo do aluno que será feita a capa
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-7">
              <FormField
                control={form.control}
                name="usuario"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="usuario" {...field} />
                    </FormControl>
                    <FormDescription>Usuário de login</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="senha" {...field} />
                    </FormControl>
                    <FormDescription>Senha de login</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="curso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curso</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Infomix | Aux. Administrativo"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Cursos do aluno</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diasDeAula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dias de Aula</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      defaultValue={["Seg"]}
                      onValueChange={(values) =>
                        form.setValue("diasDeAula", values)
                      }
                      variant="outline"
                      className="justify-between"
                    >
                      <ToggleGroupItem value="Seg">Segunda</ToggleGroupItem>
                      <ToggleGroupItem value="Ter">Terça</ToggleGroupItem>
                      <ToggleGroupItem value="Qua">Quarta</ToggleGroupItem>
                      <ToggleGroupItem value="Qui">Quinta</ToggleGroupItem>
                      <ToggleGroupItem value="Sex">Sexta</ToggleGroupItem>
                      <ToggleGroupItem value="Sab">Sábado</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>
                    Dias em que o aluno irá fazer as aulas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between gap-7">
              <FormField
                control={form.control}
                name="inicioDoHorario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inicio do Horário</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormDescription>Horário de início</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fimDoHorario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fim do Horário</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormDescription>Horário de fim</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inicioDoCurso"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Início do Curso</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        onChange={(e) =>
                          form.setValue(
                            "inicioDoCurso",
                            new Date(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>Data de início do curso</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="reset"
                className="py-5 px-10"
                variant="ghost"
                onClick={() => form.reset()}
              >
                Limpar
              </Button>
              <Button type="submit" className="py-5 px-10">
                Gerar
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {values && isModalOpen && (
        <GeneratedCover
          values={values}
          toggleModal={() => setIsModalOpen(!isModalOpen)}
        />
      )}
    </div>
  );
}
