import { z } from "zod";

export const formSchema = z.object({
  aluno: z.string(),
  usuario: z.string(),
  senha: z.string().default("1234"),
  curso: z.string(),
  diasDeAula: z.array(z.string()),
  inicioDoHorario: z.string(),
  fimDoHorario: z.string(),
  inicioDoCurso: z.date(),
});

export type FormSchema = z.infer<typeof formSchema>;
