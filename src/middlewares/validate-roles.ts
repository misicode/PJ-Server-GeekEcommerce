import { NextFunction, Request, Response } from "express";

export const isAdminRole = async (req: Request, res: Response, next: NextFunction) => {
  // Valida que el usuario autenticado exista
  if (!req.user)
    return res.status(500).json({
      msg: "Usuario autenticado no verificado, no se puede validar el rol",
    });
  
  // Obtiene el rol del usuario autenticado
  const role: string = req.user.role;

  // Valida el rol de administrador
  if (role !== "ADMIN_ROLE")
    return res.status(401).json({
      msg: "No tiene permisos de administrador para realizar esta operación",
    });

  next();
};

export const checkRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Valida que el usuario autenticado exista
    if (!req.user)
      return res.status(500).json({
        msg: "Usuario autenticado no verificado, no se puede obtener el rol",
      });

    // Valida que el rol sea el autorizado
    if (!roles.includes(req.user.role))
      return res.status(401).json({
        msg: `No tiene permisos de ${roles} para realizar esta operación`,
      });

    next();
  }
};