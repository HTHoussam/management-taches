import { useCallback, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Box,
  Button,
  Card,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema, { FormValues } from "./ValidationSchema";
import axios from "axios";
import { faker } from "@faker-js/faker";

function App() {
  const [isOpenModal, setIsOpenModal] = useState(true);
  const mockData = useMemo(() => {
    return Array.from({ length: 8 }).map((_, idx) => {
      return {
        id: faker.number.int(),
        name: faker.word.noun(),
        description: faker.commerce.department(),
      };
    });
  }, []);
  const [tasksList, setTasksLists] = useState<
    {
      name: string;
      description: string;
      id: number;
    }[]
  >(mockData);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      taskName: "",
      description: "",
    },
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = useCallback(async (formValues: FormValues) => {
    try {
      // await axios.post("/task", formValues).then((res) => {
      //   setTasksLists((prev) => [...prev, res.data]);
      // });
      setTasksLists((prev) => [...prev, formValues]);
      setIsOpenModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #e0e0e0, #f0f0f0)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          flexDirection: "row",
          gap: 4,
          padding: 8,
        }}
      >
        {tasksList.map(({ name, description, id }, idx) => {
          return (
            <Card
              key={id}
              sx={{
                minHeight: "260px",
                minWidth: "300px",
                padding: 4,
                gap: 4,
              }}
            >
              <Stack direction="column">
                <Box>
                  <Typography>{name}</Typography>
                </Box>
                <Box>
                  <Typography>nom</Typography>
                  <Box>{description}</Box>
                </Box>
              </Stack>
            </Card>
          );
        })}
      </Stack>
      <Modal
        sx={{
          maxWidth: "600px",
          transform: "translate(110%,20%)",
          height: "fit-content",
        }}
        open={isOpenModal}
      >
        <Paper
          sx={{
            padding: 4,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={"column"} gap={2}>
              <Typography>create your first task here</Typography>
              <TextField {...register("taskName")} label="Nom du tache" />
              <TextField {...register("description")} label="description" />
            </Stack>
            <Button type="submit">Ajouter</Button>
          </form>
        </Paper>
      </Modal>
    </Box>
  );
}

export default App;
