import {
  BookingRequestSent as BookingRequestSentEvent,
  BookingResponseReceived as BookingResponseReceivedEvent,
  FundsWithdrawn as FundsWithdrawnEvent,
  HackerRegistered as HackerRegisteredEvent,
  OwnershipTransferRequested as OwnershipTransferRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PrizeDeposited as PrizeDepositedEvent,
  RequestFulfilled as RequestFulfilledEvent,
  RequestSent as RequestSentEvent,
  SponsorFunded as SponsorFundedEvent,
} from "../generated/HackathonCrowdfunding/HackathonCrowdfunding";
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
  SponsorFunded,
} from "../generated/schema";

export function handleBookingRequestSent(event: BookingRequestSentEvent): void {
  let entity = new BookingRequestSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.requestId = event.params.requestId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBookingResponseReceived(
  event: BookingResponseReceivedEvent
): void {
  let entity = new BookingResponseReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.requestId = event.params.requestId;
  entity.success = event.params.success;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFundsWithdrawn(event: FundsWithdrawnEvent): void {
  let entity = new FundsWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.hacker = event.params.hacker;
  entity.recipient = event.params.recipient;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleHackerRegistered(event: HackerRegisteredEvent): void {
  let entity = new HackerRegistered(event.params.hacker);

  entity.hacker = event.params.hacker;
  entity.name = event.params.name;
  entity.email = event.params.email;
  entity.githubLink = event.params.githubLink;
  entity.competitionName = event.params.competitionName;
  entity.requestedAmount = event.params.requestedAmount;
  entity.receivedAmount = event.params.receivedAmount;
  entity.totalPrize = event.params.totalPrize;
  entity.prizePercentageForSponsor = event.params.prizePercentageForSponsor;
  entity.exists = event.params.exists;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferRequested(
  event: OwnershipTransferRequestedEvent
): void {
  let entity = new OwnershipTransferRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePrizeDeposited(event: PrizeDepositedEvent): void {
  let prizeDepositedEntity = new PrizeDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  let hackerRegisteredEntity = HackerRegistered.load(event.params.hacker);

  // Ensure the HackerRegistered entity exists
  if (hackerRegisteredEntity == null) {
    return; // Exit early if the hacker entity doesn't exist
  }

  prizeDepositedEntity.hacker = event.params.hacker;
  prizeDepositedEntity.amount = event.params.amount;

  prizeDepositedEntity.blockNumber = event.block.number;
  prizeDepositedEntity.blockTimestamp = event.block.timestamp;
  prizeDepositedEntity.transactionHash = event.transaction.hash;

  hackerRegisteredEntity.totalPrize = hackerRegisteredEntity.totalPrize.plus(
    event.params.amount
  );

  hackerRegisteredEntity.save();
  prizeDepositedEntity.save();
}

export function handleRequestFulfilled(event: RequestFulfilledEvent): void {
  let entity = new RequestFulfilled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.HackathonCrowdfunding_id = event.params.id;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRequestSent(event: RequestSentEvent): void {
  let entity = new RequestSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.HackathonCrowdfunding_id = event.params.id;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSponsorFunded(event: SponsorFundedEvent): void {
  let sponsorFundedEntity = new SponsorFunded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  let hackerRegisteredEntity = HackerRegistered.load(event.params.hacker);

  // Ensure the HackerRegistered entity exists
  if (hackerRegisteredEntity == null) {
    return; // Exit early if the hacker entity doesn't exist
  }

  sponsorFundedEntity.sponsor = event.params.sponsor;
  sponsorFundedEntity.hacker = event.params.hacker;
  sponsorFundedEntity.amount = event.params.amount;

  sponsorFundedEntity.blockNumber = event.block.number;
  sponsorFundedEntity.blockTimestamp = event.block.timestamp;
  sponsorFundedEntity.transactionHash = event.transaction.hash;

  hackerRegisteredEntity.receivedAmount =
    hackerRegisteredEntity.receivedAmount.plus(event.params.amount);

  sponsorFundedEntity.save();
  hackerRegisteredEntity.save();
}
