import { Request } from "express";
import { Model } from "mongoose";

export default class IsExistsMiddleware<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async isExists(req: Request) {
    const doc = await this.model.findById(req.params.id);
    if (!doc) {
      throw new Error("Requested model was not found");
    }
    return { status: null, data: null };
  }
}
