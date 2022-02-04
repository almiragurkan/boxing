import { TrainingProfileModel } from "./training-profile"

test("can be created", () => {
  const instance = TrainingProfileModel.create({})

  expect(instance).toBeTruthy()
})
