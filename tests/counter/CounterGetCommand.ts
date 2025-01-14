import {
  CounterCommand,
  Principal,
  Real,
  Stub,
} from "./CounterCommandModel.ts";

export class CounterGetCommand implements CounterCommand {
  readonly sender: Principal;

  constructor(
    sender: Principal,
  ) {
    this.sender = sender;
  }

  check(model: Readonly<Stub>): boolean {
    return model.counter > 0;
  }

  run(model: Stub, real: Real): void {
    real.chain
      .callReadOnlyFn(
        "counter",
        "get-counter",
        [],
        this.sender.value,
      )
      .result
      .expectUint(model.counter);

    console.log(
      `Ӿ tx-sender ${this.sender.value.padStart(41, " ")} ✓ ${
        "get-counter".padStart(11, " ")
      }`,
    );
  }

  toString() {
    return `get-counter`;
  }
}
