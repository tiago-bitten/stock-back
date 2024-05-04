import { Request, Response, NextFunction } from "express";

class HealthController {

    public check = async (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({ message: 'ok' })
    }
};

export default new HealthController;