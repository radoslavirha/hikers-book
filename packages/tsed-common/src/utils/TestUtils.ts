export class TestUtils {
  // Stubs are used to return values from services/controllers.
  // But when testing responses, Date objects are converted to strings.
  public static stringifyStubTimestamps(object: { createdAt: Date; updatedAt: Date }): {
    createdAt: string;
    updatedAt: string;
  } {
    if (object?.createdAt instanceof Date) {
      // @ts-expect-error retyping Ts.ED response
      object.createdAt = object.createdAt.toISOString();
    }
    if (object?.updatedAt instanceof Date) {
      // @ts-expect-error retyping Ts.ED response
      object.updatedAt = object.updatedAt.toISOString();
    }
    return object as unknown as { createdAt: string; updatedAt: string };
  }
}
