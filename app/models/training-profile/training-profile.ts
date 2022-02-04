import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const TrainingProfileModel = types
  .model("TrainingProfile")
  .props({
    id: types.identifierNumber,
    name: types.maybe(types.string),
    rounds: types.maybe(types.number),
    timeOfRound: types.maybe(types.number), // in seconds
    timeOfRest: types.maybe(types.number), // in seconds
    timeRoundWarning: types.maybe(types.number), // in seconds
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type TrainingProfileType = Instance<typeof TrainingProfileModel>
export interface TrainingProfile extends TrainingProfileType {}
type TrainingProfileSnapshotType = SnapshotOut<typeof TrainingProfileModel>
export interface TrainingProfileSnapshot extends TrainingProfileSnapshotType {}
export const createTrainingProfileDefaultModel = () => types.optional(TrainingProfileModel, {})
