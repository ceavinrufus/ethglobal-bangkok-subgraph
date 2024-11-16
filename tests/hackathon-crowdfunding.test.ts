import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { BookingRequestSent } from "../generated/schema"
import { BookingRequestSent as BookingRequestSentEvent } from "../generated/HackathonCrowdfunding/HackathonCrowdfunding"
import { handleBookingRequestSent } from "../src/hackathon-crowdfunding"
import { createBookingRequestSentEvent } from "./hackathon-crowdfunding-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let requestId = Bytes.fromI32(1234567890)
    let newBookingRequestSentEvent = createBookingRequestSentEvent(requestId)
    handleBookingRequestSent(newBookingRequestSentEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BookingRequestSent created and stored", () => {
    assert.entityCount("BookingRequestSent", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BookingRequestSent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "requestId",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
