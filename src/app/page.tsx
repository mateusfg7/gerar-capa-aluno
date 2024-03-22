"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const formSchema = z.object({
  aluno: z.string(),
  usuario: z.string(),
  senha: z.string().default("1234"),
  curso: z.string(),
  diasDeAula: z.array(z.string()),
  inicioDoHorario: z.string(),
  fimDoHorario: z.string(),
  inicioDoCurso: z.date(),
});
type FormSchema = z.infer<typeof formSchema>;

export default function Home() {
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
    console.log(values);
  }

  return (
    <div className="p-6 max-w-lg rounded-md m-auto">
      <h1>Gerar Capa Alunos</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        form.setValue("inicioDoCurso", new Date(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>Data de início do curso</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="py-5 px-10">
              Gerar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
