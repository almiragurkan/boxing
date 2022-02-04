import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { TrainingProfileModel, TrainingProfileSnapshot } from "../training-profile/training-profile"
import { withEnvironment } from "../extensions/with-environment"


export const TrainingProfileStoreModel = types
  .model("TrainingProfileStore")
  .props({
    profiles: types.optional(types.array(TrainingProfileModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveProfiles: (profileSnapshots: TrainingProfileSnapshot[]) => {
      self.profiles.replace(profileSnapshots)
    },
    saveProfile: (id: number) => {},
    getProfile: (id: number) => {},
    updateProfile: (profile: TrainingProfileSnapshot) => {},
  }))


type TrainingProfileStoreType = Instance<typeof TrainingProfileStoreModel>

export interface TrainingProfileStore extends TrainingProfileStoreType {
}

type TrainingProfileSnapshotType = SnapshotOut<typeof TrainingProfileStoreModel>

export interface TrainingProfileStoreSnapshot extends TrainingProfileSnapshotType {
}

export const createTrainingProfileStoreDefaultModel = () => types.optional(TrainingProfileStoreModel, {})