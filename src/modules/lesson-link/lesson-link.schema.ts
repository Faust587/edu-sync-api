import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type LessonLinkDocument = HydratedDocument<LessonLink>;

@Schema({
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
  toObject: {
    transform: (_, ret) => {
      ret.id = ret._id.toHexString();
      delete ret._id;
    },
  },
})
export class LessonLink {
  @Prop({ required: false, type: MongooseSchema.Types.String })
  googleMeetCode: string;

  @Prop({ required: false, type: MongooseSchema.Types.String })
  zoomCode: string;

  @Prop({ required: false, type: MongooseSchema.Types.String })
  customLink: string;
}

export const LessonLinkSchema = SchemaFactory.createForClass(LessonLink);

LessonLinkSchema.pre('validate', function (next) {
  const { googleMeetCode, zoomCode, customLink } = this;

  if (!(googleMeetCode || zoomCode || customLink)) {
    const err = new Error(
      'At least one of the fields (googleMeetCode, zoomCode, customLink) must not be empty',
    );
    next(err);
  } else {
    next();
  }
});
