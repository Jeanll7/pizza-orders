import prismaClient from "../../prisma";
import bcrypt from "bcryptjs";
import { sign, SignOptions } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Verificar se o email existe.
    const user = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      throw new Error("User/password incorrect");
    }

    // preciso verificar se a senha que ele mandou está correta.
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("User/password incorrect");
    }

    // gerar um token JWT e devolver os dados do usuario com id, name e email
    const tokenOptions: SignOptions = {
      expiresIn: "1h", // Tempo de expiração do token (1 hora, por exemplo)
    };

    const token = sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
