import mongoose, { Schema } from "mongoose";

const InstitutesSchema = new Schema({
  name: String,
});
const Institutes = mongoose.model("Institutes", InstitutesSchema);

const BoardSchema = new Schema({ name: String });
const Boards = mongoose.model("Board", BoardSchema);

const MediumSchema = new Schema({ name: String });
const Mediums = mongoose.model("Medium", MediumSchema);

const ClassCategoriesSchema = new Schema({ name: String });
const ClassCategories = mongoose.model(
  "ClassCategories",
  ClassCategoriesSchema
);

const StatndardSchema = new Schema({
  name: String,
  classCategory: { type: mongoose.Types.ObjectId, ref: "ClassCategories" },
});
const Statndards = mongoose.model("Statndards", StatndardSchema);

const SubjectSchema = new Schema({
  name: String,
  standardId: { type: mongoose.Types.ObjectId },
});
const Subjects = mongoose.model("Subject", SubjectSchema);

export { Institutes, Boards, Mediums, ClassCategories, Statndards, Subjects };
