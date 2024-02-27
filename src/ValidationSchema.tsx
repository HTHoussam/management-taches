import * as yup from "yup";

const validationSchema = yup.object().shape({
  taskName: yup.string().required("Task name is required"),
  description: yup.string(),
});

export default validationSchema;
export type FormValues = yup.InferType<typeof validationSchema>;
