import mongoose, { Schema } from "mongoose";

const ClassCategorySchema = new Schema(
  {
    classCategory: {
      type: String,
      enum: ["Pre-primary", "Primary", "Secondary", "Higher Secondary"],
    },
    statndard: { type: String },
    subject: { type: String },
  },
  {
    _id: false,
  }
);

const PlayhouseSchema = new Schema(
  {},
  {
    _id: false,
  }
);
const CollegeSchema = new Schema(
  {
    university: { type: String },
    degree: { type: String, enum: ["Bachelor", "Master"] },
  },
  {
    _id: false,
  }
);
const SchoolSchema = new Schema(
  {
    board: { type: String, enum: ["GSAB", "CBSE"] },
    medium: { type: String, enum: ["English", "Hindi"] },
    classCategory: ClassCategorySchema,
  },
  {
    _id: false,
  }
);
const ExamCentersSchema = new Schema(
  {
    examTypes: { type: String, enum: ["CET", "CAT"] },
  },
  {
    _id: false,
  }
);

const UserSchema = new Schema(
  {
    institute: {
      type: String,
      enum: ["Playhouses", "School", "Colleges", "Competitive Exam Centers"],
    },
    school: SchoolSchema,
    college: CollegeSchema,
    playHouse: PlayhouseSchema,
    examCenter: ExamCentersSchema,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export { User };
