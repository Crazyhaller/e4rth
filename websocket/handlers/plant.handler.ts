import type { Server, Socket } from 'socket.io'
import {
  type PlantUpdatedPayload,
  type ScanCompletedPayload,
  WS_EVENTS,
} from '../events'

export function plantRoom(userId: string) {
  return `user:${userId}:plants`
}

export function registerPlantHandlers(socket: Socket) {
  socket.on(WS_EVENTS.REGISTER, (payload: { userId?: string }) => {
    if (!payload.userId) return
    socket.join(plantRoom(payload.userId))
  })
}

export function emitScanCompleted(io: Server, payload: ScanCompletedPayload) {
  io.to(plantRoom(payload.userId)).emit(WS_EVENTS.SCAN_COMPLETED, payload.scan)
}

export function emitPlantUpdated(io: Server, payload: PlantUpdatedPayload) {
  io.to(plantRoom(payload.userId)).emit(WS_EVENTS.PLANT_UPDATED, {
    plantId: payload.plantId,
  })
}
