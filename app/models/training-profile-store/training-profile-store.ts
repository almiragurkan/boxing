import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { TrainingProfileModel, TrainingProfileSnapshot } from "../training-profile/training-profile"
import { withEnvironment } from "../extensions/with-environment"
import { noop } from "mobx/dist/utils/utils"

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
    saveProfile: (id: number) => {
      noop()
    },
    getProfile: (id: number) => {
      noop()
    },
    updateProfile: (profile: TrainingProfileSnapshot) => {
      noop()
    },
  }))


type TrainingProfileStoreType = Instance<typeof TrainingProfileStoreModel>

export interface TrainingProfileStore extends TrainingProfileStoreType {
}

type TrainingProfileSnapshotType = SnapshotOut<typeof TrainingProfileStoreModel>

export interface TrainingProfileStoreSnapshot extends TrainingProfileSnapshotType {
}

export const createTrainingProfileStoreDefaultModel = () => types.optional(TrainingProfileStoreModel, {})