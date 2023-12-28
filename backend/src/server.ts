import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import cors from "cors";
import path from "path"

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    //Se for uma instancia do tipo error
    console.error(`Erro do cliente: ${err.message}`);
    return res.status(400).json({
      error: err.message,
    });
  }

  // Log mais informativo para erros internos
  console.error("Erro interno do servidor:", err);

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

app.listen(3333, () => console.log("Servidor online!"));
