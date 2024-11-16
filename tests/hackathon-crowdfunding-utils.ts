import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BookingRequestSent,
  BookingResponseReceived,
  FundsWithdrawn,
  HackerRegistered,
  OwnershipTransferRequested,
  OwnershipTransferred,
  PrizeDeposited,
  RequestFulfilled,
  RequestSent,
  SponsorFunded
} from "../generated/HackathonCrowdfunding/HackathonCrowdfunding"

export function createBookingRequestSentEvent(
  requestId: Bytes
): BookingRequestSent {
  let bookingRequestSentEvent = changetype<BookingRequestSent>(newMockEvent())

  bookingRequestSentEvent.parameters = new Array()

  bookingRequestSentEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromFixedBytes(requestId)
    )
  )

  return bookingRequestSentEvent
}

export function createBookingResponseReceivedEvent(
  requestId: Bytes,
  success: boolean
): BookingResponseReceived {
  let bookingResponseReceivedEvent = changetype<BookingResponseReceived>(
    newMockEvent()
  )

  bookingResponseReceivedEvent.parameters = new Array()

  bookingResponseReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromFixedBytes(requestId)
    )
  )
  bookingResponseReceivedEvent.parameters.push(
    new ethereum.EventParam("success", ethereum.Value.fromBoolean(success))
  )

  return bookingResponseReceivedEvent
}

export function createFundsWithdrawnEvent(
  hacker: Address,
  recipient: Address,
  amount: BigInt
): FundsWithdrawn {
  let fundsWithdrawnEvent = changetype<FundsWithdrawn>(newMockEvent())

  fundsWithdrawnEvent.parameters = new Array()

  fundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam("hacker", ethereum.Value.fromAddress(hacker))
  )
  fundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  fundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return fundsWithdrawnEvent
}

export function createHackerRegisteredEvent(
  hacker: Address,
  name: string,
  email: string,
  githubLink: string,
  competitionName: string,
  requestedAmount: BigInt,
  receivedAmount: BigInt,
  totalPrize: BigInt,
  prizePercentageForSponsor: BigInt,
  exists: boolean
): HackerRegistered {
  let hackerRegisteredEvent = changetype<HackerRegistered>(newMockEvent())

  hackerRegisteredEvent.parameters = new Array()

  hackerRegisteredEvent.parameters.push(
    new ethereum.EventParam("hacker", ethereum.Value.fromAddress(hacker))
  )
  hackerRegisteredEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  hackerRegisteredEvent.parameters.push(
    new ethereum.EventParam("email", ethereum.Value.fromString(email))
  )
  hackerRegisteredEvent.parameters.push(
    new ethereum.EventParam("githubLink", ethereum.Value.fromString(githubLink))
  )
  hackerRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "competitionName",
      ethereum.Value.fromString(competitionName)
    )
  )
  hackerRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "requestedAmount",
      ethereum.Value.fromUnsignedBigInt(requestedAmount)
    )
  )
  hackerRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "receivedAmount",
      ethereum.Value.fromUnsignedBigInt(receivedAmount)
    )
  )
  hackerRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "totalPrize",
      ethereum.Value.fromUnsignedBigInt(totalPrize)
    )
  )
  hackerRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "prizePercentageForSponsor",
      ethereum.Value.fromUnsignedBigInt(prizePercentageForSponsor)
    )
  )
  hackerRegisteredEvent.parameters.push(
    new ethereum.EventParam("exists", ethereum.Value.fromBoolean(exists))
  )

  return hackerRegisteredEvent
}

export function createOwnershipTransferRequestedEvent(
  from: Address,
  to: Address
): OwnershipTransferRequested {
  let ownershipTransferRequestedEvent = changetype<OwnershipTransferRequested>(
    newMockEvent()
  )

  ownershipTransferRequestedEvent.parameters = new Array()

  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferRequestedEvent
}

export function createOwnershipTransferredEvent(
  from: Address,
  to: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferredEvent
}

export function createPrizeDepositedEvent(
  hacker: Address,
  amount: BigInt
): PrizeDeposited {
  let prizeDepositedEvent = changetype<PrizeDeposited>(newMockEvent())

  prizeDepositedEvent.parameters = new Array()

  prizeDepositedEvent.parameters.push(
    new ethereum.EventParam("hacker", ethereum.Value.fromAddress(hacker))
  )
  prizeDepositedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return prizeDepositedEvent
}

export function createRequestFulfilledEvent(id: Bytes): RequestFulfilled {
  let requestFulfilledEvent = changetype<RequestFulfilled>(newMockEvent())

  requestFulfilledEvent.parameters = new Array()

  requestFulfilledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return requestFulfilledEvent
}

export function createRequestSentEvent(id: Bytes): RequestSent {
  let requestSentEvent = changetype<RequestSent>(newMockEvent())

  requestSentEvent.parameters = new Array()

  requestSentEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return requestSentEvent
}

export function createSponsorFundedEvent(
  sponsor: Address,
  hacker: Address,
  amount: BigInt
): SponsorFunded {
  let sponsorFundedEvent = changetype<SponsorFunded>(newMockEvent())

  sponsorFundedEvent.parameters = new Array()

  sponsorFundedEvent.parameters.push(
    new ethereum.EventParam("sponsor", ethereum.Value.fromAddress(sponsor))
  )
  sponsorFundedEvent.parameters.push(
    new ethereum.EventParam("hacker", ethereum.Value.fromAddress(hacker))
  )
  sponsorFundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return sponsorFundedEvent
}
