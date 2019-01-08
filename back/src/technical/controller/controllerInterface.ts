import { Request, Response } from 'express';

type ControllerInterface = (req: Request, res: Response) => Promise<void>;

export default ControllerInterface;
