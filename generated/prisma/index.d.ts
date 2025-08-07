
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model answers
 * 
 */
export type answers = $Result.DefaultSelection<Prisma.$answersPayload>
/**
 * Model options
 * 
 */
export type options = $Result.DefaultSelection<Prisma.$optionsPayload>
/**
 * Model matching_pairs
 * 
 */
export type matching_pairs = $Result.DefaultSelection<Prisma.$matching_pairsPayload>
/**
 * Model drag_drop_items
 * 
 */
export type drag_drop_items = $Result.DefaultSelection<Prisma.$drag_drop_itemsPayload>
/**
 * Model ordering_items
 * 
 */
export type ordering_items = $Result.DefaultSelection<Prisma.$ordering_itemsPayload>
/**
 * Model teams
 * 
 */
export type teams = $Result.DefaultSelection<Prisma.$teamsPayload>
/**
 * Model participant_history
 * 
 */
export type participant_history = $Result.DefaultSelection<Prisma.$participant_historyPayload>
/**
 * Model questions
 * 
 */
export type questions = $Result.DefaultSelection<Prisma.$questionsPayload>
/**
 * Model quiz_sessions
 * 
 */
export type quiz_sessions = $Result.DefaultSelection<Prisma.$quiz_sessionsPayload>
/**
 * Model quizzes
 * 
 */
export type quizzes = $Result.DefaultSelection<Prisma.$quizzesPayload>
/**
 * Model session_participants
 * 
 */
export type session_participants = $Result.DefaultSelection<Prisma.$session_participantsPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const questions_type: {
  multiple_choice: 'multiple_choice',
  true_false: 'true_false',
  matching_pairs: 'matching_pairs',
  drag_drop: 'drag_drop',
  ordering: 'ordering'
};

export type questions_type = (typeof questions_type)[keyof typeof questions_type]


export const quiz_sessions_status: {
  waiting: 'waiting',
  active: 'active',
  paused: 'paused',
  completed: 'completed'
};

export type quiz_sessions_status = (typeof quiz_sessions_status)[keyof typeof quiz_sessions_status]


export const users_role: {
  host: 'host',
  participant: 'participant'
};

export type users_role = (typeof users_role)[keyof typeof users_role]


export const quizzes_status: {
  draft: 'draft',
  inactive: 'inactive',
  active: 'active',
  stopped: 'stopped',
  completed: 'completed',
  terminated: 'terminated'
};

export type quizzes_status = (typeof quizzes_status)[keyof typeof quizzes_status]


export const questions_media_type: {
  image: 'image',
  video: 'video'
};

export type questions_media_type = (typeof questions_media_type)[keyof typeof questions_media_type]

}

export type questions_type = $Enums.questions_type

export const questions_type: typeof $Enums.questions_type

export type quiz_sessions_status = $Enums.quiz_sessions_status

export const quiz_sessions_status: typeof $Enums.quiz_sessions_status

export type users_role = $Enums.users_role

export const users_role: typeof $Enums.users_role

export type quizzes_status = $Enums.quizzes_status

export const quizzes_status: typeof $Enums.quizzes_status

export type questions_media_type = $Enums.questions_media_type

export const questions_media_type: typeof $Enums.questions_media_type

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Answers
 * const answers = await prisma.answers.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Answers
   * const answers = await prisma.answers.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.answers`: Exposes CRUD operations for the **answers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Answers
    * const answers = await prisma.answers.findMany()
    * ```
    */
  get answers(): Prisma.answersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.options`: Exposes CRUD operations for the **options** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Options
    * const options = await prisma.options.findMany()
    * ```
    */
  get options(): Prisma.optionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matching_pairs`: Exposes CRUD operations for the **matching_pairs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Matching_pairs
    * const matching_pairs = await prisma.matching_pairs.findMany()
    * ```
    */
  get matching_pairs(): Prisma.matching_pairsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.drag_drop_items`: Exposes CRUD operations for the **drag_drop_items** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drag_drop_items
    * const drag_drop_items = await prisma.drag_drop_items.findMany()
    * ```
    */
  get drag_drop_items(): Prisma.drag_drop_itemsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ordering_items`: Exposes CRUD operations for the **ordering_items** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ordering_items
    * const ordering_items = await prisma.ordering_items.findMany()
    * ```
    */
  get ordering_items(): Prisma.ordering_itemsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teams`: Exposes CRUD operations for the **teams** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.teams.findMany()
    * ```
    */
  get teams(): Prisma.teamsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.participant_history`: Exposes CRUD operations for the **participant_history** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Participant_histories
    * const participant_histories = await prisma.participant_history.findMany()
    * ```
    */
  get participant_history(): Prisma.participant_historyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.questions`: Exposes CRUD operations for the **questions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.questions.findMany()
    * ```
    */
  get questions(): Prisma.questionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quiz_sessions`: Exposes CRUD operations for the **quiz_sessions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quiz_sessions
    * const quiz_sessions = await prisma.quiz_sessions.findMany()
    * ```
    */
  get quiz_sessions(): Prisma.quiz_sessionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quizzes`: Exposes CRUD operations for the **quizzes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quizzes
    * const quizzes = await prisma.quizzes.findMany()
    * ```
    */
  get quizzes(): Prisma.quizzesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session_participants`: Exposes CRUD operations for the **session_participants** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Session_participants
    * const session_participants = await prisma.session_participants.findMany()
    * ```
    */
  get session_participants(): Prisma.session_participantsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    answers: 'answers',
    options: 'options',
    matching_pairs: 'matching_pairs',
    drag_drop_items: 'drag_drop_items',
    ordering_items: 'ordering_items',
    teams: 'teams',
    participant_history: 'participant_history',
    questions: 'questions',
    quiz_sessions: 'quiz_sessions',
    quizzes: 'quizzes',
    session_participants: 'session_participants',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "answers" | "options" | "matching_pairs" | "drag_drop_items" | "ordering_items" | "teams" | "participant_history" | "questions" | "quiz_sessions" | "quizzes" | "session_participants" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      answers: {
        payload: Prisma.$answersPayload<ExtArgs>
        fields: Prisma.answersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.answersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$answersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.answersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$answersPayload>
          }
          findFirst: {
            args: Prisma.answersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$answersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.answersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$answersPayload>
          }
          findMany: {
            args: Prisma.answersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$answersPayload>[]
          }
          create: {
            args: Prisma.answersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$answersPayload>
          }
          createMany: {
            args: Prisma.answersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.answersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$answersPayload>
          }
          update: {
            args: Prisma.answersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$answersPayload>
          }
          deleteMany: {
            args: Prisma.answersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.answersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.answersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$answersPayload>
          }
          aggregate: {
            args: Prisma.AnswersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnswers>
          }
          groupBy: {
            args: Prisma.answersGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnswersGroupByOutputType>[]
          }
          count: {
            args: Prisma.answersCountArgs<ExtArgs>
            result: $Utils.Optional<AnswersCountAggregateOutputType> | number
          }
        }
      }
      options: {
        payload: Prisma.$optionsPayload<ExtArgs>
        fields: Prisma.optionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.optionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.optionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optionsPayload>
          }
          findFirst: {
            args: Prisma.optionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.optionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optionsPayload>
          }
          findMany: {
            args: Prisma.optionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optionsPayload>[]
          }
          create: {
            args: Prisma.optionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optionsPayload>
          }
          createMany: {
            args: Prisma.optionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.optionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optionsPayload>
          }
          update: {
            args: Prisma.optionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optionsPayload>
          }
          deleteMany: {
            args: Prisma.optionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.optionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.optionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optionsPayload>
          }
          aggregate: {
            args: Prisma.OptionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOptions>
          }
          groupBy: {
            args: Prisma.optionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<OptionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.optionsCountArgs<ExtArgs>
            result: $Utils.Optional<OptionsCountAggregateOutputType> | number
          }
        }
      }
      matching_pairs: {
        payload: Prisma.$matching_pairsPayload<ExtArgs>
        fields: Prisma.matching_pairsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.matching_pairsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$matching_pairsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.matching_pairsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$matching_pairsPayload>
          }
          findFirst: {
            args: Prisma.matching_pairsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$matching_pairsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.matching_pairsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$matching_pairsPayload>
          }
          findMany: {
            args: Prisma.matching_pairsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$matching_pairsPayload>[]
          }
          create: {
            args: Prisma.matching_pairsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$matching_pairsPayload>
          }
          createMany: {
            args: Prisma.matching_pairsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.matching_pairsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$matching_pairsPayload>
          }
          update: {
            args: Prisma.matching_pairsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$matching_pairsPayload>
          }
          deleteMany: {
            args: Prisma.matching_pairsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.matching_pairsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.matching_pairsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$matching_pairsPayload>
          }
          aggregate: {
            args: Prisma.Matching_pairsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatching_pairs>
          }
          groupBy: {
            args: Prisma.matching_pairsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Matching_pairsGroupByOutputType>[]
          }
          count: {
            args: Prisma.matching_pairsCountArgs<ExtArgs>
            result: $Utils.Optional<Matching_pairsCountAggregateOutputType> | number
          }
        }
      }
      drag_drop_items: {
        payload: Prisma.$drag_drop_itemsPayload<ExtArgs>
        fields: Prisma.drag_drop_itemsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.drag_drop_itemsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$drag_drop_itemsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.drag_drop_itemsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$drag_drop_itemsPayload>
          }
          findFirst: {
            args: Prisma.drag_drop_itemsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$drag_drop_itemsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.drag_drop_itemsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$drag_drop_itemsPayload>
          }
          findMany: {
            args: Prisma.drag_drop_itemsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$drag_drop_itemsPayload>[]
          }
          create: {
            args: Prisma.drag_drop_itemsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$drag_drop_itemsPayload>
          }
          createMany: {
            args: Prisma.drag_drop_itemsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.drag_drop_itemsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$drag_drop_itemsPayload>
          }
          update: {
            args: Prisma.drag_drop_itemsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$drag_drop_itemsPayload>
          }
          deleteMany: {
            args: Prisma.drag_drop_itemsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.drag_drop_itemsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.drag_drop_itemsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$drag_drop_itemsPayload>
          }
          aggregate: {
            args: Prisma.Drag_drop_itemsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDrag_drop_items>
          }
          groupBy: {
            args: Prisma.drag_drop_itemsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Drag_drop_itemsGroupByOutputType>[]
          }
          count: {
            args: Prisma.drag_drop_itemsCountArgs<ExtArgs>
            result: $Utils.Optional<Drag_drop_itemsCountAggregateOutputType> | number
          }
        }
      }
      ordering_items: {
        payload: Prisma.$ordering_itemsPayload<ExtArgs>
        fields: Prisma.ordering_itemsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ordering_itemsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ordering_itemsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ordering_itemsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ordering_itemsPayload>
          }
          findFirst: {
            args: Prisma.ordering_itemsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ordering_itemsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ordering_itemsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ordering_itemsPayload>
          }
          findMany: {
            args: Prisma.ordering_itemsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ordering_itemsPayload>[]
          }
          create: {
            args: Prisma.ordering_itemsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ordering_itemsPayload>
          }
          createMany: {
            args: Prisma.ordering_itemsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ordering_itemsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ordering_itemsPayload>
          }
          update: {
            args: Prisma.ordering_itemsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ordering_itemsPayload>
          }
          deleteMany: {
            args: Prisma.ordering_itemsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ordering_itemsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ordering_itemsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ordering_itemsPayload>
          }
          aggregate: {
            args: Prisma.Ordering_itemsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrdering_items>
          }
          groupBy: {
            args: Prisma.ordering_itemsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Ordering_itemsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ordering_itemsCountArgs<ExtArgs>
            result: $Utils.Optional<Ordering_itemsCountAggregateOutputType> | number
          }
        }
      }
      teams: {
        payload: Prisma.$teamsPayload<ExtArgs>
        fields: Prisma.teamsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.teamsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.teamsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>
          }
          findFirst: {
            args: Prisma.teamsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.teamsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>
          }
          findMany: {
            args: Prisma.teamsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>[]
          }
          create: {
            args: Prisma.teamsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>
          }
          createMany: {
            args: Prisma.teamsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.teamsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>
          }
          update: {
            args: Prisma.teamsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>
          }
          deleteMany: {
            args: Prisma.teamsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.teamsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.teamsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>
          }
          aggregate: {
            args: Prisma.TeamsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeams>
          }
          groupBy: {
            args: Prisma.teamsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamsGroupByOutputType>[]
          }
          count: {
            args: Prisma.teamsCountArgs<ExtArgs>
            result: $Utils.Optional<TeamsCountAggregateOutputType> | number
          }
        }
      }
      participant_history: {
        payload: Prisma.$participant_historyPayload<ExtArgs>
        fields: Prisma.participant_historyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.participant_historyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_historyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.participant_historyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_historyPayload>
          }
          findFirst: {
            args: Prisma.participant_historyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_historyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.participant_historyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_historyPayload>
          }
          findMany: {
            args: Prisma.participant_historyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_historyPayload>[]
          }
          create: {
            args: Prisma.participant_historyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_historyPayload>
          }
          createMany: {
            args: Prisma.participant_historyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.participant_historyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_historyPayload>
          }
          update: {
            args: Prisma.participant_historyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_historyPayload>
          }
          deleteMany: {
            args: Prisma.participant_historyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.participant_historyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.participant_historyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_historyPayload>
          }
          aggregate: {
            args: Prisma.Participant_historyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParticipant_history>
          }
          groupBy: {
            args: Prisma.participant_historyGroupByArgs<ExtArgs>
            result: $Utils.Optional<Participant_historyGroupByOutputType>[]
          }
          count: {
            args: Prisma.participant_historyCountArgs<ExtArgs>
            result: $Utils.Optional<Participant_historyCountAggregateOutputType> | number
          }
        }
      }
      questions: {
        payload: Prisma.$questionsPayload<ExtArgs>
        fields: Prisma.questionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.questionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$questionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.questionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$questionsPayload>
          }
          findFirst: {
            args: Prisma.questionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$questionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.questionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$questionsPayload>
          }
          findMany: {
            args: Prisma.questionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$questionsPayload>[]
          }
          create: {
            args: Prisma.questionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$questionsPayload>
          }
          createMany: {
            args: Prisma.questionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.questionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$questionsPayload>
          }
          update: {
            args: Prisma.questionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$questionsPayload>
          }
          deleteMany: {
            args: Prisma.questionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.questionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.questionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$questionsPayload>
          }
          aggregate: {
            args: Prisma.QuestionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestions>
          }
          groupBy: {
            args: Prisma.questionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.questionsCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionsCountAggregateOutputType> | number
          }
        }
      }
      quiz_sessions: {
        payload: Prisma.$quiz_sessionsPayload<ExtArgs>
        fields: Prisma.quiz_sessionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.quiz_sessionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quiz_sessionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.quiz_sessionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quiz_sessionsPayload>
          }
          findFirst: {
            args: Prisma.quiz_sessionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quiz_sessionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.quiz_sessionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quiz_sessionsPayload>
          }
          findMany: {
            args: Prisma.quiz_sessionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quiz_sessionsPayload>[]
          }
          create: {
            args: Prisma.quiz_sessionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quiz_sessionsPayload>
          }
          createMany: {
            args: Prisma.quiz_sessionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.quiz_sessionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quiz_sessionsPayload>
          }
          update: {
            args: Prisma.quiz_sessionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quiz_sessionsPayload>
          }
          deleteMany: {
            args: Prisma.quiz_sessionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.quiz_sessionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.quiz_sessionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quiz_sessionsPayload>
          }
          aggregate: {
            args: Prisma.Quiz_sessionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuiz_sessions>
          }
          groupBy: {
            args: Prisma.quiz_sessionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Quiz_sessionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.quiz_sessionsCountArgs<ExtArgs>
            result: $Utils.Optional<Quiz_sessionsCountAggregateOutputType> | number
          }
        }
      }
      quizzes: {
        payload: Prisma.$quizzesPayload<ExtArgs>
        fields: Prisma.quizzesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.quizzesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizzesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.quizzesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizzesPayload>
          }
          findFirst: {
            args: Prisma.quizzesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizzesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.quizzesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizzesPayload>
          }
          findMany: {
            args: Prisma.quizzesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizzesPayload>[]
          }
          create: {
            args: Prisma.quizzesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizzesPayload>
          }
          createMany: {
            args: Prisma.quizzesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.quizzesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizzesPayload>
          }
          update: {
            args: Prisma.quizzesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizzesPayload>
          }
          deleteMany: {
            args: Prisma.quizzesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.quizzesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.quizzesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizzesPayload>
          }
          aggregate: {
            args: Prisma.QuizzesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuizzes>
          }
          groupBy: {
            args: Prisma.quizzesGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizzesGroupByOutputType>[]
          }
          count: {
            args: Prisma.quizzesCountArgs<ExtArgs>
            result: $Utils.Optional<QuizzesCountAggregateOutputType> | number
          }
        }
      }
      session_participants: {
        payload: Prisma.$session_participantsPayload<ExtArgs>
        fields: Prisma.session_participantsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.session_participantsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$session_participantsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.session_participantsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$session_participantsPayload>
          }
          findFirst: {
            args: Prisma.session_participantsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$session_participantsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.session_participantsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$session_participantsPayload>
          }
          findMany: {
            args: Prisma.session_participantsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$session_participantsPayload>[]
          }
          create: {
            args: Prisma.session_participantsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$session_participantsPayload>
          }
          createMany: {
            args: Prisma.session_participantsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.session_participantsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$session_participantsPayload>
          }
          update: {
            args: Prisma.session_participantsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$session_participantsPayload>
          }
          deleteMany: {
            args: Prisma.session_participantsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.session_participantsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.session_participantsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$session_participantsPayload>
          }
          aggregate: {
            args: Prisma.Session_participantsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession_participants>
          }
          groupBy: {
            args: Prisma.session_participantsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Session_participantsGroupByOutputType>[]
          }
          count: {
            args: Prisma.session_participantsCountArgs<ExtArgs>
            result: $Utils.Optional<Session_participantsCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    answers?: answersOmit
    options?: optionsOmit
    matching_pairs?: matching_pairsOmit
    drag_drop_items?: drag_drop_itemsOmit
    ordering_items?: ordering_itemsOmit
    teams?: teamsOmit
    participant_history?: participant_historyOmit
    questions?: questionsOmit
    quiz_sessions?: quiz_sessionsOmit
    quizzes?: quizzesOmit
    session_participants?: session_participantsOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type QuestionsCountOutputType
   */

  export type QuestionsCountOutputType = {
    answers: number
    options: number
    matching_pairs: number
    drag_drop_items: number
    ordering_items: number
  }

  export type QuestionsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | QuestionsCountOutputTypeCountAnswersArgs
    options?: boolean | QuestionsCountOutputTypeCountOptionsArgs
    matching_pairs?: boolean | QuestionsCountOutputTypeCountMatching_pairsArgs
    drag_drop_items?: boolean | QuestionsCountOutputTypeCountDrag_drop_itemsArgs
    ordering_items?: boolean | QuestionsCountOutputTypeCountOrdering_itemsArgs
  }

  // Custom InputTypes
  /**
   * QuestionsCountOutputType without action
   */
  export type QuestionsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionsCountOutputType
     */
    select?: QuestionsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionsCountOutputType without action
   */
  export type QuestionsCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: answersWhereInput
  }

  /**
   * QuestionsCountOutputType without action
   */
  export type QuestionsCountOutputTypeCountOptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: optionsWhereInput
  }

  /**
   * QuestionsCountOutputType without action
   */
  export type QuestionsCountOutputTypeCountMatching_pairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: matching_pairsWhereInput
  }

  /**
   * QuestionsCountOutputType without action
   */
  export type QuestionsCountOutputTypeCountDrag_drop_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: drag_drop_itemsWhereInput
  }

  /**
   * QuestionsCountOutputType without action
   */
  export type QuestionsCountOutputTypeCountOrdering_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ordering_itemsWhereInput
  }


  /**
   * Count Type Quiz_sessionsCountOutputType
   */

  export type Quiz_sessionsCountOutputType = {
    session_participants: number
  }

  export type Quiz_sessionsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session_participants?: boolean | Quiz_sessionsCountOutputTypeCountSession_participantsArgs
  }

  // Custom InputTypes
  /**
   * Quiz_sessionsCountOutputType without action
   */
  export type Quiz_sessionsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz_sessionsCountOutputType
     */
    select?: Quiz_sessionsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Quiz_sessionsCountOutputType without action
   */
  export type Quiz_sessionsCountOutputTypeCountSession_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: session_participantsWhereInput
  }


  /**
   * Count Type QuizzesCountOutputType
   */

  export type QuizzesCountOutputType = {
    participant_history: number
    questions: number
    quiz_sessions: number
    teams: number
  }

  export type QuizzesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant_history?: boolean | QuizzesCountOutputTypeCountParticipant_historyArgs
    questions?: boolean | QuizzesCountOutputTypeCountQuestionsArgs
    quiz_sessions?: boolean | QuizzesCountOutputTypeCountQuiz_sessionsArgs
    teams?: boolean | QuizzesCountOutputTypeCountTeamsArgs
  }

  // Custom InputTypes
  /**
   * QuizzesCountOutputType without action
   */
  export type QuizzesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizzesCountOutputType
     */
    select?: QuizzesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuizzesCountOutputType without action
   */
  export type QuizzesCountOutputTypeCountParticipant_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: participant_historyWhereInput
  }

  /**
   * QuizzesCountOutputType without action
   */
  export type QuizzesCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: questionsWhereInput
  }

  /**
   * QuizzesCountOutputType without action
   */
  export type QuizzesCountOutputTypeCountQuiz_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: quiz_sessionsWhereInput
  }

  /**
   * QuizzesCountOutputType without action
   */
  export type QuizzesCountOutputTypeCountTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: teamsWhereInput
  }


  /**
   * Count Type Session_participantsCountOutputType
   */

  export type Session_participantsCountOutputType = {
    answers: number
  }

  export type Session_participantsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | Session_participantsCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * Session_participantsCountOutputType without action
   */
  export type Session_participantsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session_participantsCountOutputType
     */
    select?: Session_participantsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Session_participantsCountOutputType without action
   */
  export type Session_participantsCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: answersWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    participant_history: number
    quiz_sessions: number
    quizzes: number
    session_participants: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant_history?: boolean | UsersCountOutputTypeCountParticipant_historyArgs
    quiz_sessions?: boolean | UsersCountOutputTypeCountQuiz_sessionsArgs
    quizzes?: boolean | UsersCountOutputTypeCountQuizzesArgs
    session_participants?: boolean | UsersCountOutputTypeCountSession_participantsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountParticipant_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: participant_historyWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountQuiz_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: quiz_sessionsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountQuizzesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: quizzesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountSession_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: session_participantsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model answers
   */

  export type AggregateAnswers = {
    _count: AnswersCountAggregateOutputType | null
    _avg: AnswersAvgAggregateOutputType | null
    _sum: AnswersSumAggregateOutputType | null
    _min: AnswersMinAggregateOutputType | null
    _max: AnswersMaxAggregateOutputType | null
  }

  export type AnswersAvgAggregateOutputType = {
    id: number | null
    session_participant_id: number | null
    question_id: number | null
    time_taken: number | null
    points_awarded: number | null
    streak_at_time: number | null
  }

  export type AnswersSumAggregateOutputType = {
    id: number | null
    session_participant_id: number | null
    question_id: number | null
    time_taken: number | null
    points_awarded: number | null
    streak_at_time: number | null
  }

  export type AnswersMinAggregateOutputType = {
    id: number | null
    session_participant_id: number | null
    question_id: number | null
    selected_option: string | null
    is_correct: boolean | null
    time_taken: number | null
    points_awarded: number | null
    streak_at_time: number | null
    answered_at: Date | null
  }

  export type AnswersMaxAggregateOutputType = {
    id: number | null
    session_participant_id: number | null
    question_id: number | null
    selected_option: string | null
    is_correct: boolean | null
    time_taken: number | null
    points_awarded: number | null
    streak_at_time: number | null
    answered_at: Date | null
  }

  export type AnswersCountAggregateOutputType = {
    id: number
    session_participant_id: number
    question_id: number
    selected_option: number
    is_correct: number
    time_taken: number
    points_awarded: number
    streak_at_time: number
    answered_at: number
    _all: number
  }


  export type AnswersAvgAggregateInputType = {
    id?: true
    session_participant_id?: true
    question_id?: true
    time_taken?: true
    points_awarded?: true
    streak_at_time?: true
  }

  export type AnswersSumAggregateInputType = {
    id?: true
    session_participant_id?: true
    question_id?: true
    time_taken?: true
    points_awarded?: true
    streak_at_time?: true
  }

  export type AnswersMinAggregateInputType = {
    id?: true
    session_participant_id?: true
    question_id?: true
    selected_option?: true
    is_correct?: true
    time_taken?: true
    points_awarded?: true
    streak_at_time?: true
    answered_at?: true
  }

  export type AnswersMaxAggregateInputType = {
    id?: true
    session_participant_id?: true
    question_id?: true
    selected_option?: true
    is_correct?: true
    time_taken?: true
    points_awarded?: true
    streak_at_time?: true
    answered_at?: true
  }

  export type AnswersCountAggregateInputType = {
    id?: true
    session_participant_id?: true
    question_id?: true
    selected_option?: true
    is_correct?: true
    time_taken?: true
    points_awarded?: true
    streak_at_time?: true
    answered_at?: true
    _all?: true
  }

  export type AnswersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which answers to aggregate.
     */
    where?: answersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of answers to fetch.
     */
    orderBy?: answersOrderByWithRelationInput | answersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: answersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned answers
    **/
    _count?: true | AnswersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnswersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnswersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnswersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnswersMaxAggregateInputType
  }

  export type GetAnswersAggregateType<T extends AnswersAggregateArgs> = {
        [P in keyof T & keyof AggregateAnswers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnswers[P]>
      : GetScalarType<T[P], AggregateAnswers[P]>
  }




  export type answersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: answersWhereInput
    orderBy?: answersOrderByWithAggregationInput | answersOrderByWithAggregationInput[]
    by: AnswersScalarFieldEnum[] | AnswersScalarFieldEnum
    having?: answersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnswersCountAggregateInputType | true
    _avg?: AnswersAvgAggregateInputType
    _sum?: AnswersSumAggregateInputType
    _min?: AnswersMinAggregateInputType
    _max?: AnswersMaxAggregateInputType
  }

  export type AnswersGroupByOutputType = {
    id: number
    session_participant_id: number
    question_id: number
    selected_option: string | null
    is_correct: boolean | null
    time_taken: number | null
    points_awarded: number | null
    streak_at_time: number | null
    answered_at: Date | null
    _count: AnswersCountAggregateOutputType | null
    _avg: AnswersAvgAggregateOutputType | null
    _sum: AnswersSumAggregateOutputType | null
    _min: AnswersMinAggregateOutputType | null
    _max: AnswersMaxAggregateOutputType | null
  }

  type GetAnswersGroupByPayload<T extends answersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnswersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnswersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnswersGroupByOutputType[P]>
            : GetScalarType<T[P], AnswersGroupByOutputType[P]>
        }
      >
    >


  export type answersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    session_participant_id?: boolean
    question_id?: boolean
    selected_option?: boolean
    is_correct?: boolean
    time_taken?: boolean
    points_awarded?: boolean
    streak_at_time?: boolean
    answered_at?: boolean
    session_participants?: boolean | session_participantsDefaultArgs<ExtArgs>
    questions?: boolean | questionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answers"]>



  export type answersSelectScalar = {
    id?: boolean
    session_participant_id?: boolean
    question_id?: boolean
    selected_option?: boolean
    is_correct?: boolean
    time_taken?: boolean
    points_awarded?: boolean
    streak_at_time?: boolean
    answered_at?: boolean
  }

  export type answersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "session_participant_id" | "question_id" | "selected_option" | "is_correct" | "time_taken" | "points_awarded" | "streak_at_time" | "answered_at", ExtArgs["result"]["answers"]>
  export type answersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session_participants?: boolean | session_participantsDefaultArgs<ExtArgs>
    questions?: boolean | questionsDefaultArgs<ExtArgs>
  }

  export type $answersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "answers"
    objects: {
      session_participants: Prisma.$session_participantsPayload<ExtArgs>
      questions: Prisma.$questionsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      session_participant_id: number
      question_id: number
      selected_option: string | null
      is_correct: boolean | null
      time_taken: number | null
      points_awarded: number | null
      streak_at_time: number | null
      answered_at: Date | null
    }, ExtArgs["result"]["answers"]>
    composites: {}
  }

  type answersGetPayload<S extends boolean | null | undefined | answersDefaultArgs> = $Result.GetResult<Prisma.$answersPayload, S>

  type answersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<answersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnswersCountAggregateInputType | true
    }

  export interface answersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['answers'], meta: { name: 'answers' } }
    /**
     * Find zero or one Answers that matches the filter.
     * @param {answersFindUniqueArgs} args - Arguments to find a Answers
     * @example
     * // Get one Answers
     * const answers = await prisma.answers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends answersFindUniqueArgs>(args: SelectSubset<T, answersFindUniqueArgs<ExtArgs>>): Prisma__answersClient<$Result.GetResult<Prisma.$answersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Answers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {answersFindUniqueOrThrowArgs} args - Arguments to find a Answers
     * @example
     * // Get one Answers
     * const answers = await prisma.answers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends answersFindUniqueOrThrowArgs>(args: SelectSubset<T, answersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__answersClient<$Result.GetResult<Prisma.$answersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Answers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {answersFindFirstArgs} args - Arguments to find a Answers
     * @example
     * // Get one Answers
     * const answers = await prisma.answers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends answersFindFirstArgs>(args?: SelectSubset<T, answersFindFirstArgs<ExtArgs>>): Prisma__answersClient<$Result.GetResult<Prisma.$answersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Answers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {answersFindFirstOrThrowArgs} args - Arguments to find a Answers
     * @example
     * // Get one Answers
     * const answers = await prisma.answers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends answersFindFirstOrThrowArgs>(args?: SelectSubset<T, answersFindFirstOrThrowArgs<ExtArgs>>): Prisma__answersClient<$Result.GetResult<Prisma.$answersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Answers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {answersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Answers
     * const answers = await prisma.answers.findMany()
     * 
     * // Get first 10 Answers
     * const answers = await prisma.answers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const answersWithIdOnly = await prisma.answers.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends answersFindManyArgs>(args?: SelectSubset<T, answersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$answersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Answers.
     * @param {answersCreateArgs} args - Arguments to create a Answers.
     * @example
     * // Create one Answers
     * const Answers = await prisma.answers.create({
     *   data: {
     *     // ... data to create a Answers
     *   }
     * })
     * 
     */
    create<T extends answersCreateArgs>(args: SelectSubset<T, answersCreateArgs<ExtArgs>>): Prisma__answersClient<$Result.GetResult<Prisma.$answersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Answers.
     * @param {answersCreateManyArgs} args - Arguments to create many Answers.
     * @example
     * // Create many Answers
     * const answers = await prisma.answers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends answersCreateManyArgs>(args?: SelectSubset<T, answersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Answers.
     * @param {answersDeleteArgs} args - Arguments to delete one Answers.
     * @example
     * // Delete one Answers
     * const Answers = await prisma.answers.delete({
     *   where: {
     *     // ... filter to delete one Answers
     *   }
     * })
     * 
     */
    delete<T extends answersDeleteArgs>(args: SelectSubset<T, answersDeleteArgs<ExtArgs>>): Prisma__answersClient<$Result.GetResult<Prisma.$answersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Answers.
     * @param {answersUpdateArgs} args - Arguments to update one Answers.
     * @example
     * // Update one Answers
     * const answers = await prisma.answers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends answersUpdateArgs>(args: SelectSubset<T, answersUpdateArgs<ExtArgs>>): Prisma__answersClient<$Result.GetResult<Prisma.$answersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Answers.
     * @param {answersDeleteManyArgs} args - Arguments to filter Answers to delete.
     * @example
     * // Delete a few Answers
     * const { count } = await prisma.answers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends answersDeleteManyArgs>(args?: SelectSubset<T, answersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Answers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {answersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Answers
     * const answers = await prisma.answers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends answersUpdateManyArgs>(args: SelectSubset<T, answersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Answers.
     * @param {answersUpsertArgs} args - Arguments to update or create a Answers.
     * @example
     * // Update or create a Answers
     * const answers = await prisma.answers.upsert({
     *   create: {
     *     // ... data to create a Answers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Answers we want to update
     *   }
     * })
     */
    upsert<T extends answersUpsertArgs>(args: SelectSubset<T, answersUpsertArgs<ExtArgs>>): Prisma__answersClient<$Result.GetResult<Prisma.$answersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Answers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {answersCountArgs} args - Arguments to filter Answers to count.
     * @example
     * // Count the number of Answers
     * const count = await prisma.answers.count({
     *   where: {
     *     // ... the filter for the Answers we want to count
     *   }
     * })
    **/
    count<T extends answersCountArgs>(
      args?: Subset<T, answersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnswersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Answers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnswersAggregateArgs>(args: Subset<T, AnswersAggregateArgs>): Prisma.PrismaPromise<GetAnswersAggregateType<T>>

    /**
     * Group by Answers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {answersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends answersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: answersGroupByArgs['orderBy'] }
        : { orderBy?: answersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, answersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnswersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the answers model
   */
  readonly fields: answersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for answers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__answersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session_participants<T extends session_participantsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, session_participantsDefaultArgs<ExtArgs>>): Prisma__session_participantsClient<$Result.GetResult<Prisma.$session_participantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    questions<T extends questionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, questionsDefaultArgs<ExtArgs>>): Prisma__questionsClient<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the answers model
   */
  interface answersFieldRefs {
    readonly id: FieldRef<"answers", 'Int'>
    readonly session_participant_id: FieldRef<"answers", 'Int'>
    readonly question_id: FieldRef<"answers", 'Int'>
    readonly selected_option: FieldRef<"answers", 'String'>
    readonly is_correct: FieldRef<"answers", 'Boolean'>
    readonly time_taken: FieldRef<"answers", 'Int'>
    readonly points_awarded: FieldRef<"answers", 'Int'>
    readonly streak_at_time: FieldRef<"answers", 'Int'>
    readonly answered_at: FieldRef<"answers", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * answers findUnique
   */
  export type answersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the answers
     */
    select?: answersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the answers
     */
    omit?: answersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: answersInclude<ExtArgs> | null
    /**
     * Filter, which answers to fetch.
     */
    where: answersWhereUniqueInput
  }

  /**
   * answers findUniqueOrThrow
   */
  export type answersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the answers
     */
    select?: answersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the answers
     */
    omit?: answersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: answersInclude<ExtArgs> | null
    /**
     * Filter, which answers to fetch.
     */
    where: answersWhereUniqueInput
  }

  /**
   * answers findFirst
   */
  export type answersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the answers
     */
    select?: answersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the answers
     */
    omit?: answersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: answersInclude<ExtArgs> | null
    /**
     * Filter, which answers to fetch.
     */
    where?: answersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of answers to fetch.
     */
    orderBy?: answersOrderByWithRelationInput | answersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for answers.
     */
    cursor?: answersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of answers.
     */
    distinct?: AnswersScalarFieldEnum | AnswersScalarFieldEnum[]
  }

  /**
   * answers findFirstOrThrow
   */
  export type answersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the answers
     */
    select?: answersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the answers
     */
    omit?: answersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: answersInclude<ExtArgs> | null
    /**
     * Filter, which answers to fetch.
     */
    where?: answersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of answers to fetch.
     */
    orderBy?: answersOrderByWithRelationInput | answersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for answers.
     */
    cursor?: answersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of answers.
     */
    distinct?: AnswersScalarFieldEnum | AnswersScalarFieldEnum[]
  }

  /**
   * answers findMany
   */
  export type answersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the answers
     */
    select?: answersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the answers
     */
    omit?: answersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: answersInclude<ExtArgs> | null
    /**
     * Filter, which answers to fetch.
     */
    where?: answersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of answers to fetch.
     */
    orderBy?: answersOrderByWithRelationInput | answersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing answers.
     */
    cursor?: answersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` answers.
     */
    skip?: number
    distinct?: AnswersScalarFieldEnum | AnswersScalarFieldEnum[]
  }

  /**
   * answers create
   */
  export type answersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the answers
     */
    select?: answersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the answers
     */
    omit?: answersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: answersInclude<ExtArgs> | null
    /**
     * The data needed to create a answers.
     */
    data: XOR<answersCreateInput, answersUncheckedCreateInput>
  }

  /**
   * answers createMany
   */
  export type answersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many answers.
     */
    data: answersCreateManyInput | answersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * answers update
   */
  export type answersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the answers
     */
    select?: answersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the answers
     */
    omit?: answersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: answersInclude<ExtArgs> | null
    /**
     * The data needed to update a answers.
     */
    data: XOR<answersUpdateInput, answersUncheckedUpdateInput>
    /**
     * Choose, which answers to update.
     */
    where: answersWhereUniqueInput
  }

  /**
   * answers updateMany
   */
  export type answersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update answers.
     */
    data: XOR<answersUpdateManyMutationInput, answersUncheckedUpdateManyInput>
    /**
     * Filter which answers to update
     */
    where?: answersWhereInput
    /**
     * Limit how many answers to update.
     */
    limit?: number
  }

  /**
   * answers upsert
   */
  export type answersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the answers
     */
    select?: answersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the answers
     */
    omit?: answersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: answersInclude<ExtArgs> | null
    /**
     * The filter to search for the answers to update in case it exists.
     */
    where: answersWhereUniqueInput
    /**
     * In case the answers found by the `where` argument doesn't exist, create a new answers with this data.
     */
    create: XOR<answersCreateInput, answersUncheckedCreateInput>
    /**
     * In case the answers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<answersUpdateInput, answersUncheckedUpdateInput>
  }

  /**
   * answers delete
   */
  export type answersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the answers
     */
    select?: answersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the answers
     */
    omit?: answersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: answersInclude<ExtArgs> | null
    /**
     * Filter which answers to delete.
     */
    where: answersWhereUniqueInput
  }

  /**
   * answers deleteMany
   */
  export type answersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which answers to delete
     */
    where?: answersWhereInput
    /**
     * Limit how many answers to delete.
     */
    limit?: number
  }

  /**
   * answers without action
   */
  export type answersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the answers
     */
    select?: answersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the answers
     */
    omit?: answersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: answersInclude<ExtArgs> | null
  }


  /**
   * Model options
   */

  export type AggregateOptions = {
    _count: OptionsCountAggregateOutputType | null
    _avg: OptionsAvgAggregateOutputType | null
    _sum: OptionsSumAggregateOutputType | null
    _min: OptionsMinAggregateOutputType | null
    _max: OptionsMaxAggregateOutputType | null
  }

  export type OptionsAvgAggregateOutputType = {
    id: number | null
    question_id: number | null
    option_index: number | null
  }

  export type OptionsSumAggregateOutputType = {
    id: number | null
    question_id: number | null
    option_index: number | null
  }

  export type OptionsMinAggregateOutputType = {
    id: number | null
    question_id: number | null
    option_text: string | null
    option_index: number | null
  }

  export type OptionsMaxAggregateOutputType = {
    id: number | null
    question_id: number | null
    option_text: string | null
    option_index: number | null
  }

  export type OptionsCountAggregateOutputType = {
    id: number
    question_id: number
    option_text: number
    option_index: number
    _all: number
  }


  export type OptionsAvgAggregateInputType = {
    id?: true
    question_id?: true
    option_index?: true
  }

  export type OptionsSumAggregateInputType = {
    id?: true
    question_id?: true
    option_index?: true
  }

  export type OptionsMinAggregateInputType = {
    id?: true
    question_id?: true
    option_text?: true
    option_index?: true
  }

  export type OptionsMaxAggregateInputType = {
    id?: true
    question_id?: true
    option_text?: true
    option_index?: true
  }

  export type OptionsCountAggregateInputType = {
    id?: true
    question_id?: true
    option_text?: true
    option_index?: true
    _all?: true
  }

  export type OptionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which options to aggregate.
     */
    where?: optionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of options to fetch.
     */
    orderBy?: optionsOrderByWithRelationInput | optionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: optionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned options
    **/
    _count?: true | OptionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OptionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OptionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OptionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OptionsMaxAggregateInputType
  }

  export type GetOptionsAggregateType<T extends OptionsAggregateArgs> = {
        [P in keyof T & keyof AggregateOptions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOptions[P]>
      : GetScalarType<T[P], AggregateOptions[P]>
  }




  export type optionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: optionsWhereInput
    orderBy?: optionsOrderByWithAggregationInput | optionsOrderByWithAggregationInput[]
    by: OptionsScalarFieldEnum[] | OptionsScalarFieldEnum
    having?: optionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OptionsCountAggregateInputType | true
    _avg?: OptionsAvgAggregateInputType
    _sum?: OptionsSumAggregateInputType
    _min?: OptionsMinAggregateInputType
    _max?: OptionsMaxAggregateInputType
  }

  export type OptionsGroupByOutputType = {
    id: number
    question_id: number
    option_text: string
    option_index: number
    _count: OptionsCountAggregateOutputType | null
    _avg: OptionsAvgAggregateOutputType | null
    _sum: OptionsSumAggregateOutputType | null
    _min: OptionsMinAggregateOutputType | null
    _max: OptionsMaxAggregateOutputType | null
  }

  type GetOptionsGroupByPayload<T extends optionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OptionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OptionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OptionsGroupByOutputType[P]>
            : GetScalarType<T[P], OptionsGroupByOutputType[P]>
        }
      >
    >


  export type optionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question_id?: boolean
    option_text?: boolean
    option_index?: boolean
    questions?: boolean | questionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["options"]>



  export type optionsSelectScalar = {
    id?: boolean
    question_id?: boolean
    option_text?: boolean
    option_index?: boolean
  }

  export type optionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "question_id" | "option_text" | "option_index", ExtArgs["result"]["options"]>
  export type optionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | questionsDefaultArgs<ExtArgs>
  }

  export type $optionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "options"
    objects: {
      questions: Prisma.$questionsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      question_id: number
      option_text: string
      option_index: number
    }, ExtArgs["result"]["options"]>
    composites: {}
  }

  type optionsGetPayload<S extends boolean | null | undefined | optionsDefaultArgs> = $Result.GetResult<Prisma.$optionsPayload, S>

  type optionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<optionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OptionsCountAggregateInputType | true
    }

  export interface optionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['options'], meta: { name: 'options' } }
    /**
     * Find zero or one Options that matches the filter.
     * @param {optionsFindUniqueArgs} args - Arguments to find a Options
     * @example
     * // Get one Options
     * const options = await prisma.options.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends optionsFindUniqueArgs>(args: SelectSubset<T, optionsFindUniqueArgs<ExtArgs>>): Prisma__optionsClient<$Result.GetResult<Prisma.$optionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Options that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {optionsFindUniqueOrThrowArgs} args - Arguments to find a Options
     * @example
     * // Get one Options
     * const options = await prisma.options.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends optionsFindUniqueOrThrowArgs>(args: SelectSubset<T, optionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__optionsClient<$Result.GetResult<Prisma.$optionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Options that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {optionsFindFirstArgs} args - Arguments to find a Options
     * @example
     * // Get one Options
     * const options = await prisma.options.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends optionsFindFirstArgs>(args?: SelectSubset<T, optionsFindFirstArgs<ExtArgs>>): Prisma__optionsClient<$Result.GetResult<Prisma.$optionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Options that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {optionsFindFirstOrThrowArgs} args - Arguments to find a Options
     * @example
     * // Get one Options
     * const options = await prisma.options.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends optionsFindFirstOrThrowArgs>(args?: SelectSubset<T, optionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__optionsClient<$Result.GetResult<Prisma.$optionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Options that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {optionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Options
     * const options = await prisma.options.findMany()
     * 
     * // Get first 10 Options
     * const options = await prisma.options.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const optionsWithIdOnly = await prisma.options.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends optionsFindManyArgs>(args?: SelectSubset<T, optionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$optionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Options.
     * @param {optionsCreateArgs} args - Arguments to create a Options.
     * @example
     * // Create one Options
     * const Options = await prisma.options.create({
     *   data: {
     *     // ... data to create a Options
     *   }
     * })
     * 
     */
    create<T extends optionsCreateArgs>(args: SelectSubset<T, optionsCreateArgs<ExtArgs>>): Prisma__optionsClient<$Result.GetResult<Prisma.$optionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Options.
     * @param {optionsCreateManyArgs} args - Arguments to create many Options.
     * @example
     * // Create many Options
     * const options = await prisma.options.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends optionsCreateManyArgs>(args?: SelectSubset<T, optionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Options.
     * @param {optionsDeleteArgs} args - Arguments to delete one Options.
     * @example
     * // Delete one Options
     * const Options = await prisma.options.delete({
     *   where: {
     *     // ... filter to delete one Options
     *   }
     * })
     * 
     */
    delete<T extends optionsDeleteArgs>(args: SelectSubset<T, optionsDeleteArgs<ExtArgs>>): Prisma__optionsClient<$Result.GetResult<Prisma.$optionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Options.
     * @param {optionsUpdateArgs} args - Arguments to update one Options.
     * @example
     * // Update one Options
     * const options = await prisma.options.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends optionsUpdateArgs>(args: SelectSubset<T, optionsUpdateArgs<ExtArgs>>): Prisma__optionsClient<$Result.GetResult<Prisma.$optionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Options.
     * @param {optionsDeleteManyArgs} args - Arguments to filter Options to delete.
     * @example
     * // Delete a few Options
     * const { count } = await prisma.options.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends optionsDeleteManyArgs>(args?: SelectSubset<T, optionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {optionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Options
     * const options = await prisma.options.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends optionsUpdateManyArgs>(args: SelectSubset<T, optionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Options.
     * @param {optionsUpsertArgs} args - Arguments to update or create a Options.
     * @example
     * // Update or create a Options
     * const options = await prisma.options.upsert({
     *   create: {
     *     // ... data to create a Options
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Options we want to update
     *   }
     * })
     */
    upsert<T extends optionsUpsertArgs>(args: SelectSubset<T, optionsUpsertArgs<ExtArgs>>): Prisma__optionsClient<$Result.GetResult<Prisma.$optionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {optionsCountArgs} args - Arguments to filter Options to count.
     * @example
     * // Count the number of Options
     * const count = await prisma.options.count({
     *   where: {
     *     // ... the filter for the Options we want to count
     *   }
     * })
    **/
    count<T extends optionsCountArgs>(
      args?: Subset<T, optionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OptionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OptionsAggregateArgs>(args: Subset<T, OptionsAggregateArgs>): Prisma.PrismaPromise<GetOptionsAggregateType<T>>

    /**
     * Group by Options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {optionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends optionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: optionsGroupByArgs['orderBy'] }
        : { orderBy?: optionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, optionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOptionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the options model
   */
  readonly fields: optionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for options.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__optionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    questions<T extends questionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, questionsDefaultArgs<ExtArgs>>): Prisma__questionsClient<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the options model
   */
  interface optionsFieldRefs {
    readonly id: FieldRef<"options", 'Int'>
    readonly question_id: FieldRef<"options", 'Int'>
    readonly option_text: FieldRef<"options", 'String'>
    readonly option_index: FieldRef<"options", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * options findUnique
   */
  export type optionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the options
     */
    select?: optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the options
     */
    omit?: optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: optionsInclude<ExtArgs> | null
    /**
     * Filter, which options to fetch.
     */
    where: optionsWhereUniqueInput
  }

  /**
   * options findUniqueOrThrow
   */
  export type optionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the options
     */
    select?: optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the options
     */
    omit?: optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: optionsInclude<ExtArgs> | null
    /**
     * Filter, which options to fetch.
     */
    where: optionsWhereUniqueInput
  }

  /**
   * options findFirst
   */
  export type optionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the options
     */
    select?: optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the options
     */
    omit?: optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: optionsInclude<ExtArgs> | null
    /**
     * Filter, which options to fetch.
     */
    where?: optionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of options to fetch.
     */
    orderBy?: optionsOrderByWithRelationInput | optionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for options.
     */
    cursor?: optionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of options.
     */
    distinct?: OptionsScalarFieldEnum | OptionsScalarFieldEnum[]
  }

  /**
   * options findFirstOrThrow
   */
  export type optionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the options
     */
    select?: optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the options
     */
    omit?: optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: optionsInclude<ExtArgs> | null
    /**
     * Filter, which options to fetch.
     */
    where?: optionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of options to fetch.
     */
    orderBy?: optionsOrderByWithRelationInput | optionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for options.
     */
    cursor?: optionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of options.
     */
    distinct?: OptionsScalarFieldEnum | OptionsScalarFieldEnum[]
  }

  /**
   * options findMany
   */
  export type optionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the options
     */
    select?: optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the options
     */
    omit?: optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: optionsInclude<ExtArgs> | null
    /**
     * Filter, which options to fetch.
     */
    where?: optionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of options to fetch.
     */
    orderBy?: optionsOrderByWithRelationInput | optionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing options.
     */
    cursor?: optionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` options.
     */
    skip?: number
    distinct?: OptionsScalarFieldEnum | OptionsScalarFieldEnum[]
  }

  /**
   * options create
   */
  export type optionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the options
     */
    select?: optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the options
     */
    omit?: optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: optionsInclude<ExtArgs> | null
    /**
     * The data needed to create a options.
     */
    data: XOR<optionsCreateInput, optionsUncheckedCreateInput>
  }

  /**
   * options createMany
   */
  export type optionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many options.
     */
    data: optionsCreateManyInput | optionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * options update
   */
  export type optionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the options
     */
    select?: optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the options
     */
    omit?: optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: optionsInclude<ExtArgs> | null
    /**
     * The data needed to update a options.
     */
    data: XOR<optionsUpdateInput, optionsUncheckedUpdateInput>
    /**
     * Choose, which options to update.
     */
    where: optionsWhereUniqueInput
  }

  /**
   * options updateMany
   */
  export type optionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update options.
     */
    data: XOR<optionsUpdateManyMutationInput, optionsUncheckedUpdateManyInput>
    /**
     * Filter which options to update
     */
    where?: optionsWhereInput
    /**
     * Limit how many options to update.
     */
    limit?: number
  }

  /**
   * options upsert
   */
  export type optionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the options
     */
    select?: optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the options
     */
    omit?: optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: optionsInclude<ExtArgs> | null
    /**
     * The filter to search for the options to update in case it exists.
     */
    where: optionsWhereUniqueInput
    /**
     * In case the options found by the `where` argument doesn't exist, create a new options with this data.
     */
    create: XOR<optionsCreateInput, optionsUncheckedCreateInput>
    /**
     * In case the options was found with the provided `where` argument, update it with this data.
     */
    update: XOR<optionsUpdateInput, optionsUncheckedUpdateInput>
  }

  /**
   * options delete
   */
  export type optionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the options
     */
    select?: optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the options
     */
    omit?: optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: optionsInclude<ExtArgs> | null
    /**
     * Filter which options to delete.
     */
    where: optionsWhereUniqueInput
  }

  /**
   * options deleteMany
   */
  export type optionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which options to delete
     */
    where?: optionsWhereInput
    /**
     * Limit how many options to delete.
     */
    limit?: number
  }

  /**
   * options without action
   */
  export type optionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the options
     */
    select?: optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the options
     */
    omit?: optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: optionsInclude<ExtArgs> | null
  }


  /**
   * Model matching_pairs
   */

  export type AggregateMatching_pairs = {
    _count: Matching_pairsCountAggregateOutputType | null
    _avg: Matching_pairsAvgAggregateOutputType | null
    _sum: Matching_pairsSumAggregateOutputType | null
    _min: Matching_pairsMinAggregateOutputType | null
    _max: Matching_pairsMaxAggregateOutputType | null
  }

  export type Matching_pairsAvgAggregateOutputType = {
    id: number | null
    question_id: number | null
    pair_index: number | null
  }

  export type Matching_pairsSumAggregateOutputType = {
    id: number | null
    question_id: number | null
    pair_index: number | null
  }

  export type Matching_pairsMinAggregateOutputType = {
    id: number | null
    question_id: number | null
    left_item: string | null
    right_item: string | null
    pair_index: number | null
  }

  export type Matching_pairsMaxAggregateOutputType = {
    id: number | null
    question_id: number | null
    left_item: string | null
    right_item: string | null
    pair_index: number | null
  }

  export type Matching_pairsCountAggregateOutputType = {
    id: number
    question_id: number
    left_item: number
    right_item: number
    pair_index: number
    _all: number
  }


  export type Matching_pairsAvgAggregateInputType = {
    id?: true
    question_id?: true
    pair_index?: true
  }

  export type Matching_pairsSumAggregateInputType = {
    id?: true
    question_id?: true
    pair_index?: true
  }

  export type Matching_pairsMinAggregateInputType = {
    id?: true
    question_id?: true
    left_item?: true
    right_item?: true
    pair_index?: true
  }

  export type Matching_pairsMaxAggregateInputType = {
    id?: true
    question_id?: true
    left_item?: true
    right_item?: true
    pair_index?: true
  }

  export type Matching_pairsCountAggregateInputType = {
    id?: true
    question_id?: true
    left_item?: true
    right_item?: true
    pair_index?: true
    _all?: true
  }

  export type Matching_pairsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which matching_pairs to aggregate.
     */
    where?: matching_pairsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of matching_pairs to fetch.
     */
    orderBy?: matching_pairsOrderByWithRelationInput | matching_pairsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: matching_pairsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` matching_pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` matching_pairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned matching_pairs
    **/
    _count?: true | Matching_pairsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Matching_pairsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Matching_pairsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Matching_pairsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Matching_pairsMaxAggregateInputType
  }

  export type GetMatching_pairsAggregateType<T extends Matching_pairsAggregateArgs> = {
        [P in keyof T & keyof AggregateMatching_pairs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatching_pairs[P]>
      : GetScalarType<T[P], AggregateMatching_pairs[P]>
  }




  export type matching_pairsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: matching_pairsWhereInput
    orderBy?: matching_pairsOrderByWithAggregationInput | matching_pairsOrderByWithAggregationInput[]
    by: Matching_pairsScalarFieldEnum[] | Matching_pairsScalarFieldEnum
    having?: matching_pairsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Matching_pairsCountAggregateInputType | true
    _avg?: Matching_pairsAvgAggregateInputType
    _sum?: Matching_pairsSumAggregateInputType
    _min?: Matching_pairsMinAggregateInputType
    _max?: Matching_pairsMaxAggregateInputType
  }

  export type Matching_pairsGroupByOutputType = {
    id: number
    question_id: number
    left_item: string
    right_item: string
    pair_index: number
    _count: Matching_pairsCountAggregateOutputType | null
    _avg: Matching_pairsAvgAggregateOutputType | null
    _sum: Matching_pairsSumAggregateOutputType | null
    _min: Matching_pairsMinAggregateOutputType | null
    _max: Matching_pairsMaxAggregateOutputType | null
  }

  type GetMatching_pairsGroupByPayload<T extends matching_pairsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Matching_pairsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Matching_pairsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Matching_pairsGroupByOutputType[P]>
            : GetScalarType<T[P], Matching_pairsGroupByOutputType[P]>
        }
      >
    >


  export type matching_pairsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question_id?: boolean
    left_item?: boolean
    right_item?: boolean
    pair_index?: boolean
    questions?: boolean | questionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matching_pairs"]>



  export type matching_pairsSelectScalar = {
    id?: boolean
    question_id?: boolean
    left_item?: boolean
    right_item?: boolean
    pair_index?: boolean
  }

  export type matching_pairsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "question_id" | "left_item" | "right_item" | "pair_index", ExtArgs["result"]["matching_pairs"]>
  export type matching_pairsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | questionsDefaultArgs<ExtArgs>
  }

  export type $matching_pairsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "matching_pairs"
    objects: {
      questions: Prisma.$questionsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      question_id: number
      left_item: string
      right_item: string
      pair_index: number
    }, ExtArgs["result"]["matching_pairs"]>
    composites: {}
  }

  type matching_pairsGetPayload<S extends boolean | null | undefined | matching_pairsDefaultArgs> = $Result.GetResult<Prisma.$matching_pairsPayload, S>

  type matching_pairsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<matching_pairsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Matching_pairsCountAggregateInputType | true
    }

  export interface matching_pairsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['matching_pairs'], meta: { name: 'matching_pairs' } }
    /**
     * Find zero or one Matching_pairs that matches the filter.
     * @param {matching_pairsFindUniqueArgs} args - Arguments to find a Matching_pairs
     * @example
     * // Get one Matching_pairs
     * const matching_pairs = await prisma.matching_pairs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends matching_pairsFindUniqueArgs>(args: SelectSubset<T, matching_pairsFindUniqueArgs<ExtArgs>>): Prisma__matching_pairsClient<$Result.GetResult<Prisma.$matching_pairsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Matching_pairs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {matching_pairsFindUniqueOrThrowArgs} args - Arguments to find a Matching_pairs
     * @example
     * // Get one Matching_pairs
     * const matching_pairs = await prisma.matching_pairs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends matching_pairsFindUniqueOrThrowArgs>(args: SelectSubset<T, matching_pairsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__matching_pairsClient<$Result.GetResult<Prisma.$matching_pairsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Matching_pairs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {matching_pairsFindFirstArgs} args - Arguments to find a Matching_pairs
     * @example
     * // Get one Matching_pairs
     * const matching_pairs = await prisma.matching_pairs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends matching_pairsFindFirstArgs>(args?: SelectSubset<T, matching_pairsFindFirstArgs<ExtArgs>>): Prisma__matching_pairsClient<$Result.GetResult<Prisma.$matching_pairsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Matching_pairs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {matching_pairsFindFirstOrThrowArgs} args - Arguments to find a Matching_pairs
     * @example
     * // Get one Matching_pairs
     * const matching_pairs = await prisma.matching_pairs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends matching_pairsFindFirstOrThrowArgs>(args?: SelectSubset<T, matching_pairsFindFirstOrThrowArgs<ExtArgs>>): Prisma__matching_pairsClient<$Result.GetResult<Prisma.$matching_pairsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Matching_pairs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {matching_pairsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Matching_pairs
     * const matching_pairs = await prisma.matching_pairs.findMany()
     * 
     * // Get first 10 Matching_pairs
     * const matching_pairs = await prisma.matching_pairs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matching_pairsWithIdOnly = await prisma.matching_pairs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends matching_pairsFindManyArgs>(args?: SelectSubset<T, matching_pairsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$matching_pairsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Matching_pairs.
     * @param {matching_pairsCreateArgs} args - Arguments to create a Matching_pairs.
     * @example
     * // Create one Matching_pairs
     * const Matching_pairs = await prisma.matching_pairs.create({
     *   data: {
     *     // ... data to create a Matching_pairs
     *   }
     * })
     * 
     */
    create<T extends matching_pairsCreateArgs>(args: SelectSubset<T, matching_pairsCreateArgs<ExtArgs>>): Prisma__matching_pairsClient<$Result.GetResult<Prisma.$matching_pairsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Matching_pairs.
     * @param {matching_pairsCreateManyArgs} args - Arguments to create many Matching_pairs.
     * @example
     * // Create many Matching_pairs
     * const matching_pairs = await prisma.matching_pairs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends matching_pairsCreateManyArgs>(args?: SelectSubset<T, matching_pairsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Matching_pairs.
     * @param {matching_pairsDeleteArgs} args - Arguments to delete one Matching_pairs.
     * @example
     * // Delete one Matching_pairs
     * const Matching_pairs = await prisma.matching_pairs.delete({
     *   where: {
     *     // ... filter to delete one Matching_pairs
     *   }
     * })
     * 
     */
    delete<T extends matching_pairsDeleteArgs>(args: SelectSubset<T, matching_pairsDeleteArgs<ExtArgs>>): Prisma__matching_pairsClient<$Result.GetResult<Prisma.$matching_pairsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Matching_pairs.
     * @param {matching_pairsUpdateArgs} args - Arguments to update one Matching_pairs.
     * @example
     * // Update one Matching_pairs
     * const matching_pairs = await prisma.matching_pairs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends matching_pairsUpdateArgs>(args: SelectSubset<T, matching_pairsUpdateArgs<ExtArgs>>): Prisma__matching_pairsClient<$Result.GetResult<Prisma.$matching_pairsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Matching_pairs.
     * @param {matching_pairsDeleteManyArgs} args - Arguments to filter Matching_pairs to delete.
     * @example
     * // Delete a few Matching_pairs
     * const { count } = await prisma.matching_pairs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends matching_pairsDeleteManyArgs>(args?: SelectSubset<T, matching_pairsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matching_pairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {matching_pairsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Matching_pairs
     * const matching_pairs = await prisma.matching_pairs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends matching_pairsUpdateManyArgs>(args: SelectSubset<T, matching_pairsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Matching_pairs.
     * @param {matching_pairsUpsertArgs} args - Arguments to update or create a Matching_pairs.
     * @example
     * // Update or create a Matching_pairs
     * const matching_pairs = await prisma.matching_pairs.upsert({
     *   create: {
     *     // ... data to create a Matching_pairs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Matching_pairs we want to update
     *   }
     * })
     */
    upsert<T extends matching_pairsUpsertArgs>(args: SelectSubset<T, matching_pairsUpsertArgs<ExtArgs>>): Prisma__matching_pairsClient<$Result.GetResult<Prisma.$matching_pairsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Matching_pairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {matching_pairsCountArgs} args - Arguments to filter Matching_pairs to count.
     * @example
     * // Count the number of Matching_pairs
     * const count = await prisma.matching_pairs.count({
     *   where: {
     *     // ... the filter for the Matching_pairs we want to count
     *   }
     * })
    **/
    count<T extends matching_pairsCountArgs>(
      args?: Subset<T, matching_pairsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Matching_pairsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Matching_pairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Matching_pairsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Matching_pairsAggregateArgs>(args: Subset<T, Matching_pairsAggregateArgs>): Prisma.PrismaPromise<GetMatching_pairsAggregateType<T>>

    /**
     * Group by Matching_pairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {matching_pairsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends matching_pairsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: matching_pairsGroupByArgs['orderBy'] }
        : { orderBy?: matching_pairsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, matching_pairsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatching_pairsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the matching_pairs model
   */
  readonly fields: matching_pairsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for matching_pairs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__matching_pairsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    questions<T extends questionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, questionsDefaultArgs<ExtArgs>>): Prisma__questionsClient<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the matching_pairs model
   */
  interface matching_pairsFieldRefs {
    readonly id: FieldRef<"matching_pairs", 'Int'>
    readonly question_id: FieldRef<"matching_pairs", 'Int'>
    readonly left_item: FieldRef<"matching_pairs", 'String'>
    readonly right_item: FieldRef<"matching_pairs", 'String'>
    readonly pair_index: FieldRef<"matching_pairs", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * matching_pairs findUnique
   */
  export type matching_pairsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the matching_pairs
     */
    select?: matching_pairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the matching_pairs
     */
    omit?: matching_pairsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: matching_pairsInclude<ExtArgs> | null
    /**
     * Filter, which matching_pairs to fetch.
     */
    where: matching_pairsWhereUniqueInput
  }

  /**
   * matching_pairs findUniqueOrThrow
   */
  export type matching_pairsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the matching_pairs
     */
    select?: matching_pairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the matching_pairs
     */
    omit?: matching_pairsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: matching_pairsInclude<ExtArgs> | null
    /**
     * Filter, which matching_pairs to fetch.
     */
    where: matching_pairsWhereUniqueInput
  }

  /**
   * matching_pairs findFirst
   */
  export type matching_pairsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the matching_pairs
     */
    select?: matching_pairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the matching_pairs
     */
    omit?: matching_pairsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: matching_pairsInclude<ExtArgs> | null
    /**
     * Filter, which matching_pairs to fetch.
     */
    where?: matching_pairsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of matching_pairs to fetch.
     */
    orderBy?: matching_pairsOrderByWithRelationInput | matching_pairsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for matching_pairs.
     */
    cursor?: matching_pairsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` matching_pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` matching_pairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of matching_pairs.
     */
    distinct?: Matching_pairsScalarFieldEnum | Matching_pairsScalarFieldEnum[]
  }

  /**
   * matching_pairs findFirstOrThrow
   */
  export type matching_pairsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the matching_pairs
     */
    select?: matching_pairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the matching_pairs
     */
    omit?: matching_pairsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: matching_pairsInclude<ExtArgs> | null
    /**
     * Filter, which matching_pairs to fetch.
     */
    where?: matching_pairsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of matching_pairs to fetch.
     */
    orderBy?: matching_pairsOrderByWithRelationInput | matching_pairsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for matching_pairs.
     */
    cursor?: matching_pairsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` matching_pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` matching_pairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of matching_pairs.
     */
    distinct?: Matching_pairsScalarFieldEnum | Matching_pairsScalarFieldEnum[]
  }

  /**
   * matching_pairs findMany
   */
  export type matching_pairsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the matching_pairs
     */
    select?: matching_pairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the matching_pairs
     */
    omit?: matching_pairsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: matching_pairsInclude<ExtArgs> | null
    /**
     * Filter, which matching_pairs to fetch.
     */
    where?: matching_pairsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of matching_pairs to fetch.
     */
    orderBy?: matching_pairsOrderByWithRelationInput | matching_pairsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing matching_pairs.
     */
    cursor?: matching_pairsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` matching_pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` matching_pairs.
     */
    skip?: number
    distinct?: Matching_pairsScalarFieldEnum | Matching_pairsScalarFieldEnum[]
  }

  /**
   * matching_pairs create
   */
  export type matching_pairsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the matching_pairs
     */
    select?: matching_pairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the matching_pairs
     */
    omit?: matching_pairsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: matching_pairsInclude<ExtArgs> | null
    /**
     * The data needed to create a matching_pairs.
     */
    data: XOR<matching_pairsCreateInput, matching_pairsUncheckedCreateInput>
  }

  /**
   * matching_pairs createMany
   */
  export type matching_pairsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many matching_pairs.
     */
    data: matching_pairsCreateManyInput | matching_pairsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * matching_pairs update
   */
  export type matching_pairsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the matching_pairs
     */
    select?: matching_pairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the matching_pairs
     */
    omit?: matching_pairsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: matching_pairsInclude<ExtArgs> | null
    /**
     * The data needed to update a matching_pairs.
     */
    data: XOR<matching_pairsUpdateInput, matching_pairsUncheckedUpdateInput>
    /**
     * Choose, which matching_pairs to update.
     */
    where: matching_pairsWhereUniqueInput
  }

  /**
   * matching_pairs updateMany
   */
  export type matching_pairsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update matching_pairs.
     */
    data: XOR<matching_pairsUpdateManyMutationInput, matching_pairsUncheckedUpdateManyInput>
    /**
     * Filter which matching_pairs to update
     */
    where?: matching_pairsWhereInput
    /**
     * Limit how many matching_pairs to update.
     */
    limit?: number
  }

  /**
   * matching_pairs upsert
   */
  export type matching_pairsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the matching_pairs
     */
    select?: matching_pairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the matching_pairs
     */
    omit?: matching_pairsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: matching_pairsInclude<ExtArgs> | null
    /**
     * The filter to search for the matching_pairs to update in case it exists.
     */
    where: matching_pairsWhereUniqueInput
    /**
     * In case the matching_pairs found by the `where` argument doesn't exist, create a new matching_pairs with this data.
     */
    create: XOR<matching_pairsCreateInput, matching_pairsUncheckedCreateInput>
    /**
     * In case the matching_pairs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<matching_pairsUpdateInput, matching_pairsUncheckedUpdateInput>
  }

  /**
   * matching_pairs delete
   */
  export type matching_pairsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the matching_pairs
     */
    select?: matching_pairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the matching_pairs
     */
    omit?: matching_pairsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: matching_pairsInclude<ExtArgs> | null
    /**
     * Filter which matching_pairs to delete.
     */
    where: matching_pairsWhereUniqueInput
  }

  /**
   * matching_pairs deleteMany
   */
  export type matching_pairsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which matching_pairs to delete
     */
    where?: matching_pairsWhereInput
    /**
     * Limit how many matching_pairs to delete.
     */
    limit?: number
  }

  /**
   * matching_pairs without action
   */
  export type matching_pairsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the matching_pairs
     */
    select?: matching_pairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the matching_pairs
     */
    omit?: matching_pairsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: matching_pairsInclude<ExtArgs> | null
  }


  /**
   * Model drag_drop_items
   */

  export type AggregateDrag_drop_items = {
    _count: Drag_drop_itemsCountAggregateOutputType | null
    _avg: Drag_drop_itemsAvgAggregateOutputType | null
    _sum: Drag_drop_itemsSumAggregateOutputType | null
    _min: Drag_drop_itemsMinAggregateOutputType | null
    _max: Drag_drop_itemsMaxAggregateOutputType | null
  }

  export type Drag_drop_itemsAvgAggregateOutputType = {
    id: number | null
    question_id: number | null
    item_index: number | null
  }

  export type Drag_drop_itemsSumAggregateOutputType = {
    id: number | null
    question_id: number | null
    item_index: number | null
  }

  export type Drag_drop_itemsMinAggregateOutputType = {
    id: number | null
    question_id: number | null
    item_text: string | null
    category: string | null
    item_index: number | null
  }

  export type Drag_drop_itemsMaxAggregateOutputType = {
    id: number | null
    question_id: number | null
    item_text: string | null
    category: string | null
    item_index: number | null
  }

  export type Drag_drop_itemsCountAggregateOutputType = {
    id: number
    question_id: number
    item_text: number
    category: number
    item_index: number
    _all: number
  }


  export type Drag_drop_itemsAvgAggregateInputType = {
    id?: true
    question_id?: true
    item_index?: true
  }

  export type Drag_drop_itemsSumAggregateInputType = {
    id?: true
    question_id?: true
    item_index?: true
  }

  export type Drag_drop_itemsMinAggregateInputType = {
    id?: true
    question_id?: true
    item_text?: true
    category?: true
    item_index?: true
  }

  export type Drag_drop_itemsMaxAggregateInputType = {
    id?: true
    question_id?: true
    item_text?: true
    category?: true
    item_index?: true
  }

  export type Drag_drop_itemsCountAggregateInputType = {
    id?: true
    question_id?: true
    item_text?: true
    category?: true
    item_index?: true
    _all?: true
  }

  export type Drag_drop_itemsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which drag_drop_items to aggregate.
     */
    where?: drag_drop_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drag_drop_items to fetch.
     */
    orderBy?: drag_drop_itemsOrderByWithRelationInput | drag_drop_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: drag_drop_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drag_drop_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drag_drop_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned drag_drop_items
    **/
    _count?: true | Drag_drop_itemsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Drag_drop_itemsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Drag_drop_itemsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Drag_drop_itemsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Drag_drop_itemsMaxAggregateInputType
  }

  export type GetDrag_drop_itemsAggregateType<T extends Drag_drop_itemsAggregateArgs> = {
        [P in keyof T & keyof AggregateDrag_drop_items]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDrag_drop_items[P]>
      : GetScalarType<T[P], AggregateDrag_drop_items[P]>
  }




  export type drag_drop_itemsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: drag_drop_itemsWhereInput
    orderBy?: drag_drop_itemsOrderByWithAggregationInput | drag_drop_itemsOrderByWithAggregationInput[]
    by: Drag_drop_itemsScalarFieldEnum[] | Drag_drop_itemsScalarFieldEnum
    having?: drag_drop_itemsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Drag_drop_itemsCountAggregateInputType | true
    _avg?: Drag_drop_itemsAvgAggregateInputType
    _sum?: Drag_drop_itemsSumAggregateInputType
    _min?: Drag_drop_itemsMinAggregateInputType
    _max?: Drag_drop_itemsMaxAggregateInputType
  }

  export type Drag_drop_itemsGroupByOutputType = {
    id: number
    question_id: number
    item_text: string
    category: string
    item_index: number
    _count: Drag_drop_itemsCountAggregateOutputType | null
    _avg: Drag_drop_itemsAvgAggregateOutputType | null
    _sum: Drag_drop_itemsSumAggregateOutputType | null
    _min: Drag_drop_itemsMinAggregateOutputType | null
    _max: Drag_drop_itemsMaxAggregateOutputType | null
  }

  type GetDrag_drop_itemsGroupByPayload<T extends drag_drop_itemsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Drag_drop_itemsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Drag_drop_itemsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Drag_drop_itemsGroupByOutputType[P]>
            : GetScalarType<T[P], Drag_drop_itemsGroupByOutputType[P]>
        }
      >
    >


  export type drag_drop_itemsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question_id?: boolean
    item_text?: boolean
    category?: boolean
    item_index?: boolean
    questions?: boolean | questionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["drag_drop_items"]>



  export type drag_drop_itemsSelectScalar = {
    id?: boolean
    question_id?: boolean
    item_text?: boolean
    category?: boolean
    item_index?: boolean
  }

  export type drag_drop_itemsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "question_id" | "item_text" | "category" | "item_index", ExtArgs["result"]["drag_drop_items"]>
  export type drag_drop_itemsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | questionsDefaultArgs<ExtArgs>
  }

  export type $drag_drop_itemsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "drag_drop_items"
    objects: {
      questions: Prisma.$questionsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      question_id: number
      item_text: string
      category: string
      item_index: number
    }, ExtArgs["result"]["drag_drop_items"]>
    composites: {}
  }

  type drag_drop_itemsGetPayload<S extends boolean | null | undefined | drag_drop_itemsDefaultArgs> = $Result.GetResult<Prisma.$drag_drop_itemsPayload, S>

  type drag_drop_itemsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<drag_drop_itemsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Drag_drop_itemsCountAggregateInputType | true
    }

  export interface drag_drop_itemsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['drag_drop_items'], meta: { name: 'drag_drop_items' } }
    /**
     * Find zero or one Drag_drop_items that matches the filter.
     * @param {drag_drop_itemsFindUniqueArgs} args - Arguments to find a Drag_drop_items
     * @example
     * // Get one Drag_drop_items
     * const drag_drop_items = await prisma.drag_drop_items.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends drag_drop_itemsFindUniqueArgs>(args: SelectSubset<T, drag_drop_itemsFindUniqueArgs<ExtArgs>>): Prisma__drag_drop_itemsClient<$Result.GetResult<Prisma.$drag_drop_itemsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Drag_drop_items that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {drag_drop_itemsFindUniqueOrThrowArgs} args - Arguments to find a Drag_drop_items
     * @example
     * // Get one Drag_drop_items
     * const drag_drop_items = await prisma.drag_drop_items.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends drag_drop_itemsFindUniqueOrThrowArgs>(args: SelectSubset<T, drag_drop_itemsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__drag_drop_itemsClient<$Result.GetResult<Prisma.$drag_drop_itemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Drag_drop_items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {drag_drop_itemsFindFirstArgs} args - Arguments to find a Drag_drop_items
     * @example
     * // Get one Drag_drop_items
     * const drag_drop_items = await prisma.drag_drop_items.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends drag_drop_itemsFindFirstArgs>(args?: SelectSubset<T, drag_drop_itemsFindFirstArgs<ExtArgs>>): Prisma__drag_drop_itemsClient<$Result.GetResult<Prisma.$drag_drop_itemsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Drag_drop_items that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {drag_drop_itemsFindFirstOrThrowArgs} args - Arguments to find a Drag_drop_items
     * @example
     * // Get one Drag_drop_items
     * const drag_drop_items = await prisma.drag_drop_items.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends drag_drop_itemsFindFirstOrThrowArgs>(args?: SelectSubset<T, drag_drop_itemsFindFirstOrThrowArgs<ExtArgs>>): Prisma__drag_drop_itemsClient<$Result.GetResult<Prisma.$drag_drop_itemsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Drag_drop_items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {drag_drop_itemsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drag_drop_items
     * const drag_drop_items = await prisma.drag_drop_items.findMany()
     * 
     * // Get first 10 Drag_drop_items
     * const drag_drop_items = await prisma.drag_drop_items.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const drag_drop_itemsWithIdOnly = await prisma.drag_drop_items.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends drag_drop_itemsFindManyArgs>(args?: SelectSubset<T, drag_drop_itemsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$drag_drop_itemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Drag_drop_items.
     * @param {drag_drop_itemsCreateArgs} args - Arguments to create a Drag_drop_items.
     * @example
     * // Create one Drag_drop_items
     * const Drag_drop_items = await prisma.drag_drop_items.create({
     *   data: {
     *     // ... data to create a Drag_drop_items
     *   }
     * })
     * 
     */
    create<T extends drag_drop_itemsCreateArgs>(args: SelectSubset<T, drag_drop_itemsCreateArgs<ExtArgs>>): Prisma__drag_drop_itemsClient<$Result.GetResult<Prisma.$drag_drop_itemsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Drag_drop_items.
     * @param {drag_drop_itemsCreateManyArgs} args - Arguments to create many Drag_drop_items.
     * @example
     * // Create many Drag_drop_items
     * const drag_drop_items = await prisma.drag_drop_items.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends drag_drop_itemsCreateManyArgs>(args?: SelectSubset<T, drag_drop_itemsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Drag_drop_items.
     * @param {drag_drop_itemsDeleteArgs} args - Arguments to delete one Drag_drop_items.
     * @example
     * // Delete one Drag_drop_items
     * const Drag_drop_items = await prisma.drag_drop_items.delete({
     *   where: {
     *     // ... filter to delete one Drag_drop_items
     *   }
     * })
     * 
     */
    delete<T extends drag_drop_itemsDeleteArgs>(args: SelectSubset<T, drag_drop_itemsDeleteArgs<ExtArgs>>): Prisma__drag_drop_itemsClient<$Result.GetResult<Prisma.$drag_drop_itemsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Drag_drop_items.
     * @param {drag_drop_itemsUpdateArgs} args - Arguments to update one Drag_drop_items.
     * @example
     * // Update one Drag_drop_items
     * const drag_drop_items = await prisma.drag_drop_items.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends drag_drop_itemsUpdateArgs>(args: SelectSubset<T, drag_drop_itemsUpdateArgs<ExtArgs>>): Prisma__drag_drop_itemsClient<$Result.GetResult<Prisma.$drag_drop_itemsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Drag_drop_items.
     * @param {drag_drop_itemsDeleteManyArgs} args - Arguments to filter Drag_drop_items to delete.
     * @example
     * // Delete a few Drag_drop_items
     * const { count } = await prisma.drag_drop_items.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends drag_drop_itemsDeleteManyArgs>(args?: SelectSubset<T, drag_drop_itemsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drag_drop_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {drag_drop_itemsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drag_drop_items
     * const drag_drop_items = await prisma.drag_drop_items.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends drag_drop_itemsUpdateManyArgs>(args: SelectSubset<T, drag_drop_itemsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Drag_drop_items.
     * @param {drag_drop_itemsUpsertArgs} args - Arguments to update or create a Drag_drop_items.
     * @example
     * // Update or create a Drag_drop_items
     * const drag_drop_items = await prisma.drag_drop_items.upsert({
     *   create: {
     *     // ... data to create a Drag_drop_items
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Drag_drop_items we want to update
     *   }
     * })
     */
    upsert<T extends drag_drop_itemsUpsertArgs>(args: SelectSubset<T, drag_drop_itemsUpsertArgs<ExtArgs>>): Prisma__drag_drop_itemsClient<$Result.GetResult<Prisma.$drag_drop_itemsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Drag_drop_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {drag_drop_itemsCountArgs} args - Arguments to filter Drag_drop_items to count.
     * @example
     * // Count the number of Drag_drop_items
     * const count = await prisma.drag_drop_items.count({
     *   where: {
     *     // ... the filter for the Drag_drop_items we want to count
     *   }
     * })
    **/
    count<T extends drag_drop_itemsCountArgs>(
      args?: Subset<T, drag_drop_itemsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Drag_drop_itemsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Drag_drop_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Drag_drop_itemsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Drag_drop_itemsAggregateArgs>(args: Subset<T, Drag_drop_itemsAggregateArgs>): Prisma.PrismaPromise<GetDrag_drop_itemsAggregateType<T>>

    /**
     * Group by Drag_drop_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {drag_drop_itemsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends drag_drop_itemsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: drag_drop_itemsGroupByArgs['orderBy'] }
        : { orderBy?: drag_drop_itemsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, drag_drop_itemsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDrag_drop_itemsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the drag_drop_items model
   */
  readonly fields: drag_drop_itemsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for drag_drop_items.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__drag_drop_itemsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    questions<T extends questionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, questionsDefaultArgs<ExtArgs>>): Prisma__questionsClient<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the drag_drop_items model
   */
  interface drag_drop_itemsFieldRefs {
    readonly id: FieldRef<"drag_drop_items", 'Int'>
    readonly question_id: FieldRef<"drag_drop_items", 'Int'>
    readonly item_text: FieldRef<"drag_drop_items", 'String'>
    readonly category: FieldRef<"drag_drop_items", 'String'>
    readonly item_index: FieldRef<"drag_drop_items", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * drag_drop_items findUnique
   */
  export type drag_drop_itemsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drag_drop_items
     */
    select?: drag_drop_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drag_drop_items
     */
    omit?: drag_drop_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: drag_drop_itemsInclude<ExtArgs> | null
    /**
     * Filter, which drag_drop_items to fetch.
     */
    where: drag_drop_itemsWhereUniqueInput
  }

  /**
   * drag_drop_items findUniqueOrThrow
   */
  export type drag_drop_itemsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drag_drop_items
     */
    select?: drag_drop_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drag_drop_items
     */
    omit?: drag_drop_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: drag_drop_itemsInclude<ExtArgs> | null
    /**
     * Filter, which drag_drop_items to fetch.
     */
    where: drag_drop_itemsWhereUniqueInput
  }

  /**
   * drag_drop_items findFirst
   */
  export type drag_drop_itemsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drag_drop_items
     */
    select?: drag_drop_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drag_drop_items
     */
    omit?: drag_drop_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: drag_drop_itemsInclude<ExtArgs> | null
    /**
     * Filter, which drag_drop_items to fetch.
     */
    where?: drag_drop_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drag_drop_items to fetch.
     */
    orderBy?: drag_drop_itemsOrderByWithRelationInput | drag_drop_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for drag_drop_items.
     */
    cursor?: drag_drop_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drag_drop_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drag_drop_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of drag_drop_items.
     */
    distinct?: Drag_drop_itemsScalarFieldEnum | Drag_drop_itemsScalarFieldEnum[]
  }

  /**
   * drag_drop_items findFirstOrThrow
   */
  export type drag_drop_itemsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drag_drop_items
     */
    select?: drag_drop_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drag_drop_items
     */
    omit?: drag_drop_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: drag_drop_itemsInclude<ExtArgs> | null
    /**
     * Filter, which drag_drop_items to fetch.
     */
    where?: drag_drop_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drag_drop_items to fetch.
     */
    orderBy?: drag_drop_itemsOrderByWithRelationInput | drag_drop_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for drag_drop_items.
     */
    cursor?: drag_drop_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drag_drop_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drag_drop_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of drag_drop_items.
     */
    distinct?: Drag_drop_itemsScalarFieldEnum | Drag_drop_itemsScalarFieldEnum[]
  }

  /**
   * drag_drop_items findMany
   */
  export type drag_drop_itemsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drag_drop_items
     */
    select?: drag_drop_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drag_drop_items
     */
    omit?: drag_drop_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: drag_drop_itemsInclude<ExtArgs> | null
    /**
     * Filter, which drag_drop_items to fetch.
     */
    where?: drag_drop_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drag_drop_items to fetch.
     */
    orderBy?: drag_drop_itemsOrderByWithRelationInput | drag_drop_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing drag_drop_items.
     */
    cursor?: drag_drop_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drag_drop_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drag_drop_items.
     */
    skip?: number
    distinct?: Drag_drop_itemsScalarFieldEnum | Drag_drop_itemsScalarFieldEnum[]
  }

  /**
   * drag_drop_items create
   */
  export type drag_drop_itemsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drag_drop_items
     */
    select?: drag_drop_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drag_drop_items
     */
    omit?: drag_drop_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: drag_drop_itemsInclude<ExtArgs> | null
    /**
     * The data needed to create a drag_drop_items.
     */
    data: XOR<drag_drop_itemsCreateInput, drag_drop_itemsUncheckedCreateInput>
  }

  /**
   * drag_drop_items createMany
   */
  export type drag_drop_itemsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many drag_drop_items.
     */
    data: drag_drop_itemsCreateManyInput | drag_drop_itemsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * drag_drop_items update
   */
  export type drag_drop_itemsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drag_drop_items
     */
    select?: drag_drop_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drag_drop_items
     */
    omit?: drag_drop_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: drag_drop_itemsInclude<ExtArgs> | null
    /**
     * The data needed to update a drag_drop_items.
     */
    data: XOR<drag_drop_itemsUpdateInput, drag_drop_itemsUncheckedUpdateInput>
    /**
     * Choose, which drag_drop_items to update.
     */
    where: drag_drop_itemsWhereUniqueInput
  }

  /**
   * drag_drop_items updateMany
   */
  export type drag_drop_itemsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update drag_drop_items.
     */
    data: XOR<drag_drop_itemsUpdateManyMutationInput, drag_drop_itemsUncheckedUpdateManyInput>
    /**
     * Filter which drag_drop_items to update
     */
    where?: drag_drop_itemsWhereInput
    /**
     * Limit how many drag_drop_items to update.
     */
    limit?: number
  }

  /**
   * drag_drop_items upsert
   */
  export type drag_drop_itemsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drag_drop_items
     */
    select?: drag_drop_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drag_drop_items
     */
    omit?: drag_drop_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: drag_drop_itemsInclude<ExtArgs> | null
    /**
     * The filter to search for the drag_drop_items to update in case it exists.
     */
    where: drag_drop_itemsWhereUniqueInput
    /**
     * In case the drag_drop_items found by the `where` argument doesn't exist, create a new drag_drop_items with this data.
     */
    create: XOR<drag_drop_itemsCreateInput, drag_drop_itemsUncheckedCreateInput>
    /**
     * In case the drag_drop_items was found with the provided `where` argument, update it with this data.
     */
    update: XOR<drag_drop_itemsUpdateInput, drag_drop_itemsUncheckedUpdateInput>
  }

  /**
   * drag_drop_items delete
   */
  export type drag_drop_itemsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drag_drop_items
     */
    select?: drag_drop_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drag_drop_items
     */
    omit?: drag_drop_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: drag_drop_itemsInclude<ExtArgs> | null
    /**
     * Filter which drag_drop_items to delete.
     */
    where: drag_drop_itemsWhereUniqueInput
  }

  /**
   * drag_drop_items deleteMany
   */
  export type drag_drop_itemsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which drag_drop_items to delete
     */
    where?: drag_drop_itemsWhereInput
    /**
     * Limit how many drag_drop_items to delete.
     */
    limit?: number
  }

  /**
   * drag_drop_items without action
   */
  export type drag_drop_itemsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drag_drop_items
     */
    select?: drag_drop_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drag_drop_items
     */
    omit?: drag_drop_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: drag_drop_itemsInclude<ExtArgs> | null
  }


  /**
   * Model ordering_items
   */

  export type AggregateOrdering_items = {
    _count: Ordering_itemsCountAggregateOutputType | null
    _avg: Ordering_itemsAvgAggregateOutputType | null
    _sum: Ordering_itemsSumAggregateOutputType | null
    _min: Ordering_itemsMinAggregateOutputType | null
    _max: Ordering_itemsMaxAggregateOutputType | null
  }

  export type Ordering_itemsAvgAggregateOutputType = {
    id: number | null
    question_id: number | null
    correct_order: number | null
  }

  export type Ordering_itemsSumAggregateOutputType = {
    id: number | null
    question_id: number | null
    correct_order: number | null
  }

  export type Ordering_itemsMinAggregateOutputType = {
    id: number | null
    question_id: number | null
    item_text: string | null
    correct_order: number | null
  }

  export type Ordering_itemsMaxAggregateOutputType = {
    id: number | null
    question_id: number | null
    item_text: string | null
    correct_order: number | null
  }

  export type Ordering_itemsCountAggregateOutputType = {
    id: number
    question_id: number
    item_text: number
    correct_order: number
    _all: number
  }


  export type Ordering_itemsAvgAggregateInputType = {
    id?: true
    question_id?: true
    correct_order?: true
  }

  export type Ordering_itemsSumAggregateInputType = {
    id?: true
    question_id?: true
    correct_order?: true
  }

  export type Ordering_itemsMinAggregateInputType = {
    id?: true
    question_id?: true
    item_text?: true
    correct_order?: true
  }

  export type Ordering_itemsMaxAggregateInputType = {
    id?: true
    question_id?: true
    item_text?: true
    correct_order?: true
  }

  export type Ordering_itemsCountAggregateInputType = {
    id?: true
    question_id?: true
    item_text?: true
    correct_order?: true
    _all?: true
  }

  export type Ordering_itemsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ordering_items to aggregate.
     */
    where?: ordering_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ordering_items to fetch.
     */
    orderBy?: ordering_itemsOrderByWithRelationInput | ordering_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ordering_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ordering_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ordering_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ordering_items
    **/
    _count?: true | Ordering_itemsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Ordering_itemsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Ordering_itemsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Ordering_itemsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Ordering_itemsMaxAggregateInputType
  }

  export type GetOrdering_itemsAggregateType<T extends Ordering_itemsAggregateArgs> = {
        [P in keyof T & keyof AggregateOrdering_items]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrdering_items[P]>
      : GetScalarType<T[P], AggregateOrdering_items[P]>
  }




  export type ordering_itemsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ordering_itemsWhereInput
    orderBy?: ordering_itemsOrderByWithAggregationInput | ordering_itemsOrderByWithAggregationInput[]
    by: Ordering_itemsScalarFieldEnum[] | Ordering_itemsScalarFieldEnum
    having?: ordering_itemsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Ordering_itemsCountAggregateInputType | true
    _avg?: Ordering_itemsAvgAggregateInputType
    _sum?: Ordering_itemsSumAggregateInputType
    _min?: Ordering_itemsMinAggregateInputType
    _max?: Ordering_itemsMaxAggregateInputType
  }

  export type Ordering_itemsGroupByOutputType = {
    id: number
    question_id: number
    item_text: string
    correct_order: number
    _count: Ordering_itemsCountAggregateOutputType | null
    _avg: Ordering_itemsAvgAggregateOutputType | null
    _sum: Ordering_itemsSumAggregateOutputType | null
    _min: Ordering_itemsMinAggregateOutputType | null
    _max: Ordering_itemsMaxAggregateOutputType | null
  }

  type GetOrdering_itemsGroupByPayload<T extends ordering_itemsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Ordering_itemsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Ordering_itemsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Ordering_itemsGroupByOutputType[P]>
            : GetScalarType<T[P], Ordering_itemsGroupByOutputType[P]>
        }
      >
    >


  export type ordering_itemsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question_id?: boolean
    item_text?: boolean
    correct_order?: boolean
    questions?: boolean | questionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ordering_items"]>



  export type ordering_itemsSelectScalar = {
    id?: boolean
    question_id?: boolean
    item_text?: boolean
    correct_order?: boolean
  }

  export type ordering_itemsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "question_id" | "item_text" | "correct_order", ExtArgs["result"]["ordering_items"]>
  export type ordering_itemsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | questionsDefaultArgs<ExtArgs>
  }

  export type $ordering_itemsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ordering_items"
    objects: {
      questions: Prisma.$questionsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      question_id: number
      item_text: string
      correct_order: number
    }, ExtArgs["result"]["ordering_items"]>
    composites: {}
  }

  type ordering_itemsGetPayload<S extends boolean | null | undefined | ordering_itemsDefaultArgs> = $Result.GetResult<Prisma.$ordering_itemsPayload, S>

  type ordering_itemsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ordering_itemsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Ordering_itemsCountAggregateInputType | true
    }

  export interface ordering_itemsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ordering_items'], meta: { name: 'ordering_items' } }
    /**
     * Find zero or one Ordering_items that matches the filter.
     * @param {ordering_itemsFindUniqueArgs} args - Arguments to find a Ordering_items
     * @example
     * // Get one Ordering_items
     * const ordering_items = await prisma.ordering_items.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ordering_itemsFindUniqueArgs>(args: SelectSubset<T, ordering_itemsFindUniqueArgs<ExtArgs>>): Prisma__ordering_itemsClient<$Result.GetResult<Prisma.$ordering_itemsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ordering_items that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ordering_itemsFindUniqueOrThrowArgs} args - Arguments to find a Ordering_items
     * @example
     * // Get one Ordering_items
     * const ordering_items = await prisma.ordering_items.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ordering_itemsFindUniqueOrThrowArgs>(args: SelectSubset<T, ordering_itemsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ordering_itemsClient<$Result.GetResult<Prisma.$ordering_itemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ordering_items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ordering_itemsFindFirstArgs} args - Arguments to find a Ordering_items
     * @example
     * // Get one Ordering_items
     * const ordering_items = await prisma.ordering_items.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ordering_itemsFindFirstArgs>(args?: SelectSubset<T, ordering_itemsFindFirstArgs<ExtArgs>>): Prisma__ordering_itemsClient<$Result.GetResult<Prisma.$ordering_itemsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ordering_items that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ordering_itemsFindFirstOrThrowArgs} args - Arguments to find a Ordering_items
     * @example
     * // Get one Ordering_items
     * const ordering_items = await prisma.ordering_items.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ordering_itemsFindFirstOrThrowArgs>(args?: SelectSubset<T, ordering_itemsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ordering_itemsClient<$Result.GetResult<Prisma.$ordering_itemsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ordering_items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ordering_itemsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ordering_items
     * const ordering_items = await prisma.ordering_items.findMany()
     * 
     * // Get first 10 Ordering_items
     * const ordering_items = await prisma.ordering_items.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ordering_itemsWithIdOnly = await prisma.ordering_items.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ordering_itemsFindManyArgs>(args?: SelectSubset<T, ordering_itemsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ordering_itemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ordering_items.
     * @param {ordering_itemsCreateArgs} args - Arguments to create a Ordering_items.
     * @example
     * // Create one Ordering_items
     * const Ordering_items = await prisma.ordering_items.create({
     *   data: {
     *     // ... data to create a Ordering_items
     *   }
     * })
     * 
     */
    create<T extends ordering_itemsCreateArgs>(args: SelectSubset<T, ordering_itemsCreateArgs<ExtArgs>>): Prisma__ordering_itemsClient<$Result.GetResult<Prisma.$ordering_itemsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ordering_items.
     * @param {ordering_itemsCreateManyArgs} args - Arguments to create many Ordering_items.
     * @example
     * // Create many Ordering_items
     * const ordering_items = await prisma.ordering_items.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ordering_itemsCreateManyArgs>(args?: SelectSubset<T, ordering_itemsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Ordering_items.
     * @param {ordering_itemsDeleteArgs} args - Arguments to delete one Ordering_items.
     * @example
     * // Delete one Ordering_items
     * const Ordering_items = await prisma.ordering_items.delete({
     *   where: {
     *     // ... filter to delete one Ordering_items
     *   }
     * })
     * 
     */
    delete<T extends ordering_itemsDeleteArgs>(args: SelectSubset<T, ordering_itemsDeleteArgs<ExtArgs>>): Prisma__ordering_itemsClient<$Result.GetResult<Prisma.$ordering_itemsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ordering_items.
     * @param {ordering_itemsUpdateArgs} args - Arguments to update one Ordering_items.
     * @example
     * // Update one Ordering_items
     * const ordering_items = await prisma.ordering_items.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ordering_itemsUpdateArgs>(args: SelectSubset<T, ordering_itemsUpdateArgs<ExtArgs>>): Prisma__ordering_itemsClient<$Result.GetResult<Prisma.$ordering_itemsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ordering_items.
     * @param {ordering_itemsDeleteManyArgs} args - Arguments to filter Ordering_items to delete.
     * @example
     * // Delete a few Ordering_items
     * const { count } = await prisma.ordering_items.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ordering_itemsDeleteManyArgs>(args?: SelectSubset<T, ordering_itemsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ordering_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ordering_itemsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ordering_items
     * const ordering_items = await prisma.ordering_items.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ordering_itemsUpdateManyArgs>(args: SelectSubset<T, ordering_itemsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Ordering_items.
     * @param {ordering_itemsUpsertArgs} args - Arguments to update or create a Ordering_items.
     * @example
     * // Update or create a Ordering_items
     * const ordering_items = await prisma.ordering_items.upsert({
     *   create: {
     *     // ... data to create a Ordering_items
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ordering_items we want to update
     *   }
     * })
     */
    upsert<T extends ordering_itemsUpsertArgs>(args: SelectSubset<T, ordering_itemsUpsertArgs<ExtArgs>>): Prisma__ordering_itemsClient<$Result.GetResult<Prisma.$ordering_itemsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ordering_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ordering_itemsCountArgs} args - Arguments to filter Ordering_items to count.
     * @example
     * // Count the number of Ordering_items
     * const count = await prisma.ordering_items.count({
     *   where: {
     *     // ... the filter for the Ordering_items we want to count
     *   }
     * })
    **/
    count<T extends ordering_itemsCountArgs>(
      args?: Subset<T, ordering_itemsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Ordering_itemsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ordering_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ordering_itemsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Ordering_itemsAggregateArgs>(args: Subset<T, Ordering_itemsAggregateArgs>): Prisma.PrismaPromise<GetOrdering_itemsAggregateType<T>>

    /**
     * Group by Ordering_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ordering_itemsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ordering_itemsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ordering_itemsGroupByArgs['orderBy'] }
        : { orderBy?: ordering_itemsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ordering_itemsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrdering_itemsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ordering_items model
   */
  readonly fields: ordering_itemsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ordering_items.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ordering_itemsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    questions<T extends questionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, questionsDefaultArgs<ExtArgs>>): Prisma__questionsClient<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ordering_items model
   */
  interface ordering_itemsFieldRefs {
    readonly id: FieldRef<"ordering_items", 'Int'>
    readonly question_id: FieldRef<"ordering_items", 'Int'>
    readonly item_text: FieldRef<"ordering_items", 'String'>
    readonly correct_order: FieldRef<"ordering_items", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ordering_items findUnique
   */
  export type ordering_itemsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ordering_items
     */
    select?: ordering_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ordering_items
     */
    omit?: ordering_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ordering_itemsInclude<ExtArgs> | null
    /**
     * Filter, which ordering_items to fetch.
     */
    where: ordering_itemsWhereUniqueInput
  }

  /**
   * ordering_items findUniqueOrThrow
   */
  export type ordering_itemsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ordering_items
     */
    select?: ordering_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ordering_items
     */
    omit?: ordering_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ordering_itemsInclude<ExtArgs> | null
    /**
     * Filter, which ordering_items to fetch.
     */
    where: ordering_itemsWhereUniqueInput
  }

  /**
   * ordering_items findFirst
   */
  export type ordering_itemsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ordering_items
     */
    select?: ordering_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ordering_items
     */
    omit?: ordering_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ordering_itemsInclude<ExtArgs> | null
    /**
     * Filter, which ordering_items to fetch.
     */
    where?: ordering_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ordering_items to fetch.
     */
    orderBy?: ordering_itemsOrderByWithRelationInput | ordering_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ordering_items.
     */
    cursor?: ordering_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ordering_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ordering_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ordering_items.
     */
    distinct?: Ordering_itemsScalarFieldEnum | Ordering_itemsScalarFieldEnum[]
  }

  /**
   * ordering_items findFirstOrThrow
   */
  export type ordering_itemsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ordering_items
     */
    select?: ordering_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ordering_items
     */
    omit?: ordering_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ordering_itemsInclude<ExtArgs> | null
    /**
     * Filter, which ordering_items to fetch.
     */
    where?: ordering_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ordering_items to fetch.
     */
    orderBy?: ordering_itemsOrderByWithRelationInput | ordering_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ordering_items.
     */
    cursor?: ordering_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ordering_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ordering_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ordering_items.
     */
    distinct?: Ordering_itemsScalarFieldEnum | Ordering_itemsScalarFieldEnum[]
  }

  /**
   * ordering_items findMany
   */
  export type ordering_itemsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ordering_items
     */
    select?: ordering_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ordering_items
     */
    omit?: ordering_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ordering_itemsInclude<ExtArgs> | null
    /**
     * Filter, which ordering_items to fetch.
     */
    where?: ordering_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ordering_items to fetch.
     */
    orderBy?: ordering_itemsOrderByWithRelationInput | ordering_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ordering_items.
     */
    cursor?: ordering_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ordering_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ordering_items.
     */
    skip?: number
    distinct?: Ordering_itemsScalarFieldEnum | Ordering_itemsScalarFieldEnum[]
  }

  /**
   * ordering_items create
   */
  export type ordering_itemsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ordering_items
     */
    select?: ordering_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ordering_items
     */
    omit?: ordering_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ordering_itemsInclude<ExtArgs> | null
    /**
     * The data needed to create a ordering_items.
     */
    data: XOR<ordering_itemsCreateInput, ordering_itemsUncheckedCreateInput>
  }

  /**
   * ordering_items createMany
   */
  export type ordering_itemsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ordering_items.
     */
    data: ordering_itemsCreateManyInput | ordering_itemsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ordering_items update
   */
  export type ordering_itemsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ordering_items
     */
    select?: ordering_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ordering_items
     */
    omit?: ordering_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ordering_itemsInclude<ExtArgs> | null
    /**
     * The data needed to update a ordering_items.
     */
    data: XOR<ordering_itemsUpdateInput, ordering_itemsUncheckedUpdateInput>
    /**
     * Choose, which ordering_items to update.
     */
    where: ordering_itemsWhereUniqueInput
  }

  /**
   * ordering_items updateMany
   */
  export type ordering_itemsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ordering_items.
     */
    data: XOR<ordering_itemsUpdateManyMutationInput, ordering_itemsUncheckedUpdateManyInput>
    /**
     * Filter which ordering_items to update
     */
    where?: ordering_itemsWhereInput
    /**
     * Limit how many ordering_items to update.
     */
    limit?: number
  }

  /**
   * ordering_items upsert
   */
  export type ordering_itemsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ordering_items
     */
    select?: ordering_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ordering_items
     */
    omit?: ordering_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ordering_itemsInclude<ExtArgs> | null
    /**
     * The filter to search for the ordering_items to update in case it exists.
     */
    where: ordering_itemsWhereUniqueInput
    /**
     * In case the ordering_items found by the `where` argument doesn't exist, create a new ordering_items with this data.
     */
    create: XOR<ordering_itemsCreateInput, ordering_itemsUncheckedCreateInput>
    /**
     * In case the ordering_items was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ordering_itemsUpdateInput, ordering_itemsUncheckedUpdateInput>
  }

  /**
   * ordering_items delete
   */
  export type ordering_itemsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ordering_items
     */
    select?: ordering_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ordering_items
     */
    omit?: ordering_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ordering_itemsInclude<ExtArgs> | null
    /**
     * Filter which ordering_items to delete.
     */
    where: ordering_itemsWhereUniqueInput
  }

  /**
   * ordering_items deleteMany
   */
  export type ordering_itemsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ordering_items to delete
     */
    where?: ordering_itemsWhereInput
    /**
     * Limit how many ordering_items to delete.
     */
    limit?: number
  }

  /**
   * ordering_items without action
   */
  export type ordering_itemsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ordering_items
     */
    select?: ordering_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ordering_items
     */
    omit?: ordering_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ordering_itemsInclude<ExtArgs> | null
  }


  /**
   * Model teams
   */

  export type AggregateTeams = {
    _count: TeamsCountAggregateOutputType | null
    _avg: TeamsAvgAggregateOutputType | null
    _sum: TeamsSumAggregateOutputType | null
    _min: TeamsMinAggregateOutputType | null
    _max: TeamsMaxAggregateOutputType | null
  }

  export type TeamsAvgAggregateOutputType = {
    id: number | null
    quiz_id: number | null
    max_members: number | null
  }

  export type TeamsSumAggregateOutputType = {
    id: number | null
    quiz_id: number | null
    max_members: number | null
  }

  export type TeamsMinAggregateOutputType = {
    id: number | null
    quiz_id: number | null
    name: string | null
    color: string | null
    max_members: number | null
    created_at: Date | null
  }

  export type TeamsMaxAggregateOutputType = {
    id: number | null
    quiz_id: number | null
    name: string | null
    color: string | null
    max_members: number | null
    created_at: Date | null
  }

  export type TeamsCountAggregateOutputType = {
    id: number
    quiz_id: number
    name: number
    color: number
    max_members: number
    created_at: number
    _all: number
  }


  export type TeamsAvgAggregateInputType = {
    id?: true
    quiz_id?: true
    max_members?: true
  }

  export type TeamsSumAggregateInputType = {
    id?: true
    quiz_id?: true
    max_members?: true
  }

  export type TeamsMinAggregateInputType = {
    id?: true
    quiz_id?: true
    name?: true
    color?: true
    max_members?: true
    created_at?: true
  }

  export type TeamsMaxAggregateInputType = {
    id?: true
    quiz_id?: true
    name?: true
    color?: true
    max_members?: true
    created_at?: true
  }

  export type TeamsCountAggregateInputType = {
    id?: true
    quiz_id?: true
    name?: true
    color?: true
    max_members?: true
    created_at?: true
    _all?: true
  }

  export type TeamsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which teams to aggregate.
     */
    where?: teamsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of teams to fetch.
     */
    orderBy?: teamsOrderByWithRelationInput | teamsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: teamsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned teams
    **/
    _count?: true | TeamsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeamsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeamsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamsMaxAggregateInputType
  }

  export type GetTeamsAggregateType<T extends TeamsAggregateArgs> = {
        [P in keyof T & keyof AggregateTeams]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeams[P]>
      : GetScalarType<T[P], AggregateTeams[P]>
  }




  export type teamsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: teamsWhereInput
    orderBy?: teamsOrderByWithAggregationInput | teamsOrderByWithAggregationInput[]
    by: TeamsScalarFieldEnum[] | TeamsScalarFieldEnum
    having?: teamsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamsCountAggregateInputType | true
    _avg?: TeamsAvgAggregateInputType
    _sum?: TeamsSumAggregateInputType
    _min?: TeamsMinAggregateInputType
    _max?: TeamsMaxAggregateInputType
  }

  export type TeamsGroupByOutputType = {
    id: number
    quiz_id: number
    name: string
    color: string
    max_members: number
    created_at: Date | null
    _count: TeamsCountAggregateOutputType | null
    _avg: TeamsAvgAggregateOutputType | null
    _sum: TeamsSumAggregateOutputType | null
    _min: TeamsMinAggregateOutputType | null
    _max: TeamsMaxAggregateOutputType | null
  }

  type GetTeamsGroupByPayload<T extends teamsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamsGroupByOutputType[P]>
            : GetScalarType<T[P], TeamsGroupByOutputType[P]>
        }
      >
    >


  export type teamsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quiz_id?: boolean
    name?: boolean
    color?: boolean
    max_members?: boolean
    created_at?: boolean
    quizzes?: boolean | quizzesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teams"]>



  export type teamsSelectScalar = {
    id?: boolean
    quiz_id?: boolean
    name?: boolean
    color?: boolean
    max_members?: boolean
    created_at?: boolean
  }

  export type teamsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quiz_id" | "name" | "color" | "max_members" | "created_at", ExtArgs["result"]["teams"]>
  export type teamsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quizzes?: boolean | quizzesDefaultArgs<ExtArgs>
  }

  export type $teamsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "teams"
    objects: {
      quizzes: Prisma.$quizzesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      quiz_id: number
      name: string
      color: string
      max_members: number
      created_at: Date | null
    }, ExtArgs["result"]["teams"]>
    composites: {}
  }

  type teamsGetPayload<S extends boolean | null | undefined | teamsDefaultArgs> = $Result.GetResult<Prisma.$teamsPayload, S>

  type teamsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<teamsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamsCountAggregateInputType | true
    }

  export interface teamsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['teams'], meta: { name: 'teams' } }
    /**
     * Find zero or one Teams that matches the filter.
     * @param {teamsFindUniqueArgs} args - Arguments to find a Teams
     * @example
     * // Get one Teams
     * const teams = await prisma.teams.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends teamsFindUniqueArgs>(args: SelectSubset<T, teamsFindUniqueArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Teams that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {teamsFindUniqueOrThrowArgs} args - Arguments to find a Teams
     * @example
     * // Get one Teams
     * const teams = await prisma.teams.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends teamsFindUniqueOrThrowArgs>(args: SelectSubset<T, teamsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {teamsFindFirstArgs} args - Arguments to find a Teams
     * @example
     * // Get one Teams
     * const teams = await prisma.teams.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends teamsFindFirstArgs>(args?: SelectSubset<T, teamsFindFirstArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teams that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {teamsFindFirstOrThrowArgs} args - Arguments to find a Teams
     * @example
     * // Get one Teams
     * const teams = await prisma.teams.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends teamsFindFirstOrThrowArgs>(args?: SelectSubset<T, teamsFindFirstOrThrowArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {teamsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.teams.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.teams.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamsWithIdOnly = await prisma.teams.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends teamsFindManyArgs>(args?: SelectSubset<T, teamsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Teams.
     * @param {teamsCreateArgs} args - Arguments to create a Teams.
     * @example
     * // Create one Teams
     * const Teams = await prisma.teams.create({
     *   data: {
     *     // ... data to create a Teams
     *   }
     * })
     * 
     */
    create<T extends teamsCreateArgs>(args: SelectSubset<T, teamsCreateArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teams.
     * @param {teamsCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const teams = await prisma.teams.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends teamsCreateManyArgs>(args?: SelectSubset<T, teamsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Teams.
     * @param {teamsDeleteArgs} args - Arguments to delete one Teams.
     * @example
     * // Delete one Teams
     * const Teams = await prisma.teams.delete({
     *   where: {
     *     // ... filter to delete one Teams
     *   }
     * })
     * 
     */
    delete<T extends teamsDeleteArgs>(args: SelectSubset<T, teamsDeleteArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Teams.
     * @param {teamsUpdateArgs} args - Arguments to update one Teams.
     * @example
     * // Update one Teams
     * const teams = await prisma.teams.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends teamsUpdateArgs>(args: SelectSubset<T, teamsUpdateArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teams.
     * @param {teamsDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.teams.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends teamsDeleteManyArgs>(args?: SelectSubset<T, teamsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {teamsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const teams = await prisma.teams.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends teamsUpdateManyArgs>(args: SelectSubset<T, teamsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Teams.
     * @param {teamsUpsertArgs} args - Arguments to update or create a Teams.
     * @example
     * // Update or create a Teams
     * const teams = await prisma.teams.upsert({
     *   create: {
     *     // ... data to create a Teams
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teams we want to update
     *   }
     * })
     */
    upsert<T extends teamsUpsertArgs>(args: SelectSubset<T, teamsUpsertArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {teamsCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.teams.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends teamsCountArgs>(
      args?: Subset<T, teamsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamsAggregateArgs>(args: Subset<T, TeamsAggregateArgs>): Prisma.PrismaPromise<GetTeamsAggregateType<T>>

    /**
     * Group by Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {teamsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends teamsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: teamsGroupByArgs['orderBy'] }
        : { orderBy?: teamsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, teamsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the teams model
   */
  readonly fields: teamsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for teams.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__teamsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quizzes<T extends quizzesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, quizzesDefaultArgs<ExtArgs>>): Prisma__quizzesClient<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the teams model
   */
  interface teamsFieldRefs {
    readonly id: FieldRef<"teams", 'Int'>
    readonly quiz_id: FieldRef<"teams", 'Int'>
    readonly name: FieldRef<"teams", 'String'>
    readonly color: FieldRef<"teams", 'String'>
    readonly max_members: FieldRef<"teams", 'Int'>
    readonly created_at: FieldRef<"teams", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * teams findUnique
   */
  export type teamsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * Filter, which teams to fetch.
     */
    where: teamsWhereUniqueInput
  }

  /**
   * teams findUniqueOrThrow
   */
  export type teamsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * Filter, which teams to fetch.
     */
    where: teamsWhereUniqueInput
  }

  /**
   * teams findFirst
   */
  export type teamsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * Filter, which teams to fetch.
     */
    where?: teamsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of teams to fetch.
     */
    orderBy?: teamsOrderByWithRelationInput | teamsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for teams.
     */
    cursor?: teamsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of teams.
     */
    distinct?: TeamsScalarFieldEnum | TeamsScalarFieldEnum[]
  }

  /**
   * teams findFirstOrThrow
   */
  export type teamsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * Filter, which teams to fetch.
     */
    where?: teamsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of teams to fetch.
     */
    orderBy?: teamsOrderByWithRelationInput | teamsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for teams.
     */
    cursor?: teamsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of teams.
     */
    distinct?: TeamsScalarFieldEnum | TeamsScalarFieldEnum[]
  }

  /**
   * teams findMany
   */
  export type teamsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * Filter, which teams to fetch.
     */
    where?: teamsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of teams to fetch.
     */
    orderBy?: teamsOrderByWithRelationInput | teamsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing teams.
     */
    cursor?: teamsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` teams.
     */
    skip?: number
    distinct?: TeamsScalarFieldEnum | TeamsScalarFieldEnum[]
  }

  /**
   * teams create
   */
  export type teamsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * The data needed to create a teams.
     */
    data: XOR<teamsCreateInput, teamsUncheckedCreateInput>
  }

  /**
   * teams createMany
   */
  export type teamsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many teams.
     */
    data: teamsCreateManyInput | teamsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * teams update
   */
  export type teamsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * The data needed to update a teams.
     */
    data: XOR<teamsUpdateInput, teamsUncheckedUpdateInput>
    /**
     * Choose, which teams to update.
     */
    where: teamsWhereUniqueInput
  }

  /**
   * teams updateMany
   */
  export type teamsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update teams.
     */
    data: XOR<teamsUpdateManyMutationInput, teamsUncheckedUpdateManyInput>
    /**
     * Filter which teams to update
     */
    where?: teamsWhereInput
    /**
     * Limit how many teams to update.
     */
    limit?: number
  }

  /**
   * teams upsert
   */
  export type teamsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * The filter to search for the teams to update in case it exists.
     */
    where: teamsWhereUniqueInput
    /**
     * In case the teams found by the `where` argument doesn't exist, create a new teams with this data.
     */
    create: XOR<teamsCreateInput, teamsUncheckedCreateInput>
    /**
     * In case the teams was found with the provided `where` argument, update it with this data.
     */
    update: XOR<teamsUpdateInput, teamsUncheckedUpdateInput>
  }

  /**
   * teams delete
   */
  export type teamsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * Filter which teams to delete.
     */
    where: teamsWhereUniqueInput
  }

  /**
   * teams deleteMany
   */
  export type teamsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which teams to delete
     */
    where?: teamsWhereInput
    /**
     * Limit how many teams to delete.
     */
    limit?: number
  }

  /**
   * teams without action
   */
  export type teamsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
  }


  /**
   * Model participant_history
   */

  export type AggregateParticipant_history = {
    _count: Participant_historyCountAggregateOutputType | null
    _avg: Participant_historyAvgAggregateOutputType | null
    _sum: Participant_historySumAggregateOutputType | null
    _min: Participant_historyMinAggregateOutputType | null
    _max: Participant_historyMaxAggregateOutputType | null
  }

  export type Participant_historyAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    quiz_id: number | null
    total_sessions: number | null
    total_score: number | null
    total_correct: number | null
    total_questions: number | null
    best_streak: number | null
  }

  export type Participant_historySumAggregateOutputType = {
    id: number | null
    user_id: number | null
    quiz_id: number | null
    total_sessions: number | null
    total_score: number | null
    total_correct: number | null
    total_questions: number | null
    best_streak: number | null
  }

  export type Participant_historyMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    quiz_id: number | null
    total_sessions: number | null
    total_score: number | null
    total_correct: number | null
    total_questions: number | null
    best_streak: number | null
    last_played: Date | null
  }

  export type Participant_historyMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    quiz_id: number | null
    total_sessions: number | null
    total_score: number | null
    total_correct: number | null
    total_questions: number | null
    best_streak: number | null
    last_played: Date | null
  }

  export type Participant_historyCountAggregateOutputType = {
    id: number
    user_id: number
    quiz_id: number
    total_sessions: number
    total_score: number
    total_correct: number
    total_questions: number
    best_streak: number
    last_played: number
    _all: number
  }


  export type Participant_historyAvgAggregateInputType = {
    id?: true
    user_id?: true
    quiz_id?: true
    total_sessions?: true
    total_score?: true
    total_correct?: true
    total_questions?: true
    best_streak?: true
  }

  export type Participant_historySumAggregateInputType = {
    id?: true
    user_id?: true
    quiz_id?: true
    total_sessions?: true
    total_score?: true
    total_correct?: true
    total_questions?: true
    best_streak?: true
  }

  export type Participant_historyMinAggregateInputType = {
    id?: true
    user_id?: true
    quiz_id?: true
    total_sessions?: true
    total_score?: true
    total_correct?: true
    total_questions?: true
    best_streak?: true
    last_played?: true
  }

  export type Participant_historyMaxAggregateInputType = {
    id?: true
    user_id?: true
    quiz_id?: true
    total_sessions?: true
    total_score?: true
    total_correct?: true
    total_questions?: true
    best_streak?: true
    last_played?: true
  }

  export type Participant_historyCountAggregateInputType = {
    id?: true
    user_id?: true
    quiz_id?: true
    total_sessions?: true
    total_score?: true
    total_correct?: true
    total_questions?: true
    best_streak?: true
    last_played?: true
    _all?: true
  }

  export type Participant_historyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which participant_history to aggregate.
     */
    where?: participant_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participant_histories to fetch.
     */
    orderBy?: participant_historyOrderByWithRelationInput | participant_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: participant_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participant_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participant_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned participant_histories
    **/
    _count?: true | Participant_historyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Participant_historyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Participant_historySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Participant_historyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Participant_historyMaxAggregateInputType
  }

  export type GetParticipant_historyAggregateType<T extends Participant_historyAggregateArgs> = {
        [P in keyof T & keyof AggregateParticipant_history]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParticipant_history[P]>
      : GetScalarType<T[P], AggregateParticipant_history[P]>
  }




  export type participant_historyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: participant_historyWhereInput
    orderBy?: participant_historyOrderByWithAggregationInput | participant_historyOrderByWithAggregationInput[]
    by: Participant_historyScalarFieldEnum[] | Participant_historyScalarFieldEnum
    having?: participant_historyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Participant_historyCountAggregateInputType | true
    _avg?: Participant_historyAvgAggregateInputType
    _sum?: Participant_historySumAggregateInputType
    _min?: Participant_historyMinAggregateInputType
    _max?: Participant_historyMaxAggregateInputType
  }

  export type Participant_historyGroupByOutputType = {
    id: number
    user_id: number
    quiz_id: number
    total_sessions: number | null
    total_score: number | null
    total_correct: number | null
    total_questions: number | null
    best_streak: number | null
    last_played: Date | null
    _count: Participant_historyCountAggregateOutputType | null
    _avg: Participant_historyAvgAggregateOutputType | null
    _sum: Participant_historySumAggregateOutputType | null
    _min: Participant_historyMinAggregateOutputType | null
    _max: Participant_historyMaxAggregateOutputType | null
  }

  type GetParticipant_historyGroupByPayload<T extends participant_historyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Participant_historyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Participant_historyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Participant_historyGroupByOutputType[P]>
            : GetScalarType<T[P], Participant_historyGroupByOutputType[P]>
        }
      >
    >


  export type participant_historySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    quiz_id?: boolean
    total_sessions?: boolean
    total_score?: boolean
    total_correct?: boolean
    total_questions?: boolean
    best_streak?: boolean
    last_played?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    quizzes?: boolean | quizzesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participant_history"]>



  export type participant_historySelectScalar = {
    id?: boolean
    user_id?: boolean
    quiz_id?: boolean
    total_sessions?: boolean
    total_score?: boolean
    total_correct?: boolean
    total_questions?: boolean
    best_streak?: boolean
    last_played?: boolean
  }

  export type participant_historyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "quiz_id" | "total_sessions" | "total_score" | "total_correct" | "total_questions" | "best_streak" | "last_played", ExtArgs["result"]["participant_history"]>
  export type participant_historyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    quizzes?: boolean | quizzesDefaultArgs<ExtArgs>
  }

  export type $participant_historyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "participant_history"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
      quizzes: Prisma.$quizzesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      quiz_id: number
      total_sessions: number | null
      total_score: number | null
      total_correct: number | null
      total_questions: number | null
      best_streak: number | null
      last_played: Date | null
    }, ExtArgs["result"]["participant_history"]>
    composites: {}
  }

  type participant_historyGetPayload<S extends boolean | null | undefined | participant_historyDefaultArgs> = $Result.GetResult<Prisma.$participant_historyPayload, S>

  type participant_historyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<participant_historyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Participant_historyCountAggregateInputType | true
    }

  export interface participant_historyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['participant_history'], meta: { name: 'participant_history' } }
    /**
     * Find zero or one Participant_history that matches the filter.
     * @param {participant_historyFindUniqueArgs} args - Arguments to find a Participant_history
     * @example
     * // Get one Participant_history
     * const participant_history = await prisma.participant_history.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends participant_historyFindUniqueArgs>(args: SelectSubset<T, participant_historyFindUniqueArgs<ExtArgs>>): Prisma__participant_historyClient<$Result.GetResult<Prisma.$participant_historyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Participant_history that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {participant_historyFindUniqueOrThrowArgs} args - Arguments to find a Participant_history
     * @example
     * // Get one Participant_history
     * const participant_history = await prisma.participant_history.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends participant_historyFindUniqueOrThrowArgs>(args: SelectSubset<T, participant_historyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__participant_historyClient<$Result.GetResult<Prisma.$participant_historyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participant_history that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participant_historyFindFirstArgs} args - Arguments to find a Participant_history
     * @example
     * // Get one Participant_history
     * const participant_history = await prisma.participant_history.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends participant_historyFindFirstArgs>(args?: SelectSubset<T, participant_historyFindFirstArgs<ExtArgs>>): Prisma__participant_historyClient<$Result.GetResult<Prisma.$participant_historyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participant_history that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participant_historyFindFirstOrThrowArgs} args - Arguments to find a Participant_history
     * @example
     * // Get one Participant_history
     * const participant_history = await prisma.participant_history.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends participant_historyFindFirstOrThrowArgs>(args?: SelectSubset<T, participant_historyFindFirstOrThrowArgs<ExtArgs>>): Prisma__participant_historyClient<$Result.GetResult<Prisma.$participant_historyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Participant_histories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participant_historyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Participant_histories
     * const participant_histories = await prisma.participant_history.findMany()
     * 
     * // Get first 10 Participant_histories
     * const participant_histories = await prisma.participant_history.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const participant_historyWithIdOnly = await prisma.participant_history.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends participant_historyFindManyArgs>(args?: SelectSubset<T, participant_historyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participant_historyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Participant_history.
     * @param {participant_historyCreateArgs} args - Arguments to create a Participant_history.
     * @example
     * // Create one Participant_history
     * const Participant_history = await prisma.participant_history.create({
     *   data: {
     *     // ... data to create a Participant_history
     *   }
     * })
     * 
     */
    create<T extends participant_historyCreateArgs>(args: SelectSubset<T, participant_historyCreateArgs<ExtArgs>>): Prisma__participant_historyClient<$Result.GetResult<Prisma.$participant_historyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Participant_histories.
     * @param {participant_historyCreateManyArgs} args - Arguments to create many Participant_histories.
     * @example
     * // Create many Participant_histories
     * const participant_history = await prisma.participant_history.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends participant_historyCreateManyArgs>(args?: SelectSubset<T, participant_historyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Participant_history.
     * @param {participant_historyDeleteArgs} args - Arguments to delete one Participant_history.
     * @example
     * // Delete one Participant_history
     * const Participant_history = await prisma.participant_history.delete({
     *   where: {
     *     // ... filter to delete one Participant_history
     *   }
     * })
     * 
     */
    delete<T extends participant_historyDeleteArgs>(args: SelectSubset<T, participant_historyDeleteArgs<ExtArgs>>): Prisma__participant_historyClient<$Result.GetResult<Prisma.$participant_historyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Participant_history.
     * @param {participant_historyUpdateArgs} args - Arguments to update one Participant_history.
     * @example
     * // Update one Participant_history
     * const participant_history = await prisma.participant_history.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends participant_historyUpdateArgs>(args: SelectSubset<T, participant_historyUpdateArgs<ExtArgs>>): Prisma__participant_historyClient<$Result.GetResult<Prisma.$participant_historyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Participant_histories.
     * @param {participant_historyDeleteManyArgs} args - Arguments to filter Participant_histories to delete.
     * @example
     * // Delete a few Participant_histories
     * const { count } = await prisma.participant_history.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends participant_historyDeleteManyArgs>(args?: SelectSubset<T, participant_historyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participant_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participant_historyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Participant_histories
     * const participant_history = await prisma.participant_history.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends participant_historyUpdateManyArgs>(args: SelectSubset<T, participant_historyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Participant_history.
     * @param {participant_historyUpsertArgs} args - Arguments to update or create a Participant_history.
     * @example
     * // Update or create a Participant_history
     * const participant_history = await prisma.participant_history.upsert({
     *   create: {
     *     // ... data to create a Participant_history
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Participant_history we want to update
     *   }
     * })
     */
    upsert<T extends participant_historyUpsertArgs>(args: SelectSubset<T, participant_historyUpsertArgs<ExtArgs>>): Prisma__participant_historyClient<$Result.GetResult<Prisma.$participant_historyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Participant_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participant_historyCountArgs} args - Arguments to filter Participant_histories to count.
     * @example
     * // Count the number of Participant_histories
     * const count = await prisma.participant_history.count({
     *   where: {
     *     // ... the filter for the Participant_histories we want to count
     *   }
     * })
    **/
    count<T extends participant_historyCountArgs>(
      args?: Subset<T, participant_historyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Participant_historyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Participant_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Participant_historyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Participant_historyAggregateArgs>(args: Subset<T, Participant_historyAggregateArgs>): Prisma.PrismaPromise<GetParticipant_historyAggregateType<T>>

    /**
     * Group by Participant_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participant_historyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends participant_historyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: participant_historyGroupByArgs['orderBy'] }
        : { orderBy?: participant_historyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, participant_historyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticipant_historyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the participant_history model
   */
  readonly fields: participant_historyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for participant_history.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__participant_historyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    quizzes<T extends quizzesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, quizzesDefaultArgs<ExtArgs>>): Prisma__quizzesClient<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the participant_history model
   */
  interface participant_historyFieldRefs {
    readonly id: FieldRef<"participant_history", 'Int'>
    readonly user_id: FieldRef<"participant_history", 'Int'>
    readonly quiz_id: FieldRef<"participant_history", 'Int'>
    readonly total_sessions: FieldRef<"participant_history", 'Int'>
    readonly total_score: FieldRef<"participant_history", 'Int'>
    readonly total_correct: FieldRef<"participant_history", 'Int'>
    readonly total_questions: FieldRef<"participant_history", 'Int'>
    readonly best_streak: FieldRef<"participant_history", 'Int'>
    readonly last_played: FieldRef<"participant_history", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * participant_history findUnique
   */
  export type participant_historyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_history
     */
    select?: participant_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_history
     */
    omit?: participant_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_historyInclude<ExtArgs> | null
    /**
     * Filter, which participant_history to fetch.
     */
    where: participant_historyWhereUniqueInput
  }

  /**
   * participant_history findUniqueOrThrow
   */
  export type participant_historyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_history
     */
    select?: participant_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_history
     */
    omit?: participant_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_historyInclude<ExtArgs> | null
    /**
     * Filter, which participant_history to fetch.
     */
    where: participant_historyWhereUniqueInput
  }

  /**
   * participant_history findFirst
   */
  export type participant_historyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_history
     */
    select?: participant_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_history
     */
    omit?: participant_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_historyInclude<ExtArgs> | null
    /**
     * Filter, which participant_history to fetch.
     */
    where?: participant_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participant_histories to fetch.
     */
    orderBy?: participant_historyOrderByWithRelationInput | participant_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for participant_histories.
     */
    cursor?: participant_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participant_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participant_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of participant_histories.
     */
    distinct?: Participant_historyScalarFieldEnum | Participant_historyScalarFieldEnum[]
  }

  /**
   * participant_history findFirstOrThrow
   */
  export type participant_historyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_history
     */
    select?: participant_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_history
     */
    omit?: participant_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_historyInclude<ExtArgs> | null
    /**
     * Filter, which participant_history to fetch.
     */
    where?: participant_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participant_histories to fetch.
     */
    orderBy?: participant_historyOrderByWithRelationInput | participant_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for participant_histories.
     */
    cursor?: participant_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participant_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participant_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of participant_histories.
     */
    distinct?: Participant_historyScalarFieldEnum | Participant_historyScalarFieldEnum[]
  }

  /**
   * participant_history findMany
   */
  export type participant_historyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_history
     */
    select?: participant_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_history
     */
    omit?: participant_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_historyInclude<ExtArgs> | null
    /**
     * Filter, which participant_histories to fetch.
     */
    where?: participant_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participant_histories to fetch.
     */
    orderBy?: participant_historyOrderByWithRelationInput | participant_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing participant_histories.
     */
    cursor?: participant_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participant_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participant_histories.
     */
    skip?: number
    distinct?: Participant_historyScalarFieldEnum | Participant_historyScalarFieldEnum[]
  }

  /**
   * participant_history create
   */
  export type participant_historyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_history
     */
    select?: participant_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_history
     */
    omit?: participant_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_historyInclude<ExtArgs> | null
    /**
     * The data needed to create a participant_history.
     */
    data: XOR<participant_historyCreateInput, participant_historyUncheckedCreateInput>
  }

  /**
   * participant_history createMany
   */
  export type participant_historyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many participant_histories.
     */
    data: participant_historyCreateManyInput | participant_historyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * participant_history update
   */
  export type participant_historyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_history
     */
    select?: participant_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_history
     */
    omit?: participant_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_historyInclude<ExtArgs> | null
    /**
     * The data needed to update a participant_history.
     */
    data: XOR<participant_historyUpdateInput, participant_historyUncheckedUpdateInput>
    /**
     * Choose, which participant_history to update.
     */
    where: participant_historyWhereUniqueInput
  }

  /**
   * participant_history updateMany
   */
  export type participant_historyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update participant_histories.
     */
    data: XOR<participant_historyUpdateManyMutationInput, participant_historyUncheckedUpdateManyInput>
    /**
     * Filter which participant_histories to update
     */
    where?: participant_historyWhereInput
    /**
     * Limit how many participant_histories to update.
     */
    limit?: number
  }

  /**
   * participant_history upsert
   */
  export type participant_historyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_history
     */
    select?: participant_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_history
     */
    omit?: participant_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_historyInclude<ExtArgs> | null
    /**
     * The filter to search for the participant_history to update in case it exists.
     */
    where: participant_historyWhereUniqueInput
    /**
     * In case the participant_history found by the `where` argument doesn't exist, create a new participant_history with this data.
     */
    create: XOR<participant_historyCreateInput, participant_historyUncheckedCreateInput>
    /**
     * In case the participant_history was found with the provided `where` argument, update it with this data.
     */
    update: XOR<participant_historyUpdateInput, participant_historyUncheckedUpdateInput>
  }

  /**
   * participant_history delete
   */
  export type participant_historyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_history
     */
    select?: participant_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_history
     */
    omit?: participant_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_historyInclude<ExtArgs> | null
    /**
     * Filter which participant_history to delete.
     */
    where: participant_historyWhereUniqueInput
  }

  /**
   * participant_history deleteMany
   */
  export type participant_historyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which participant_histories to delete
     */
    where?: participant_historyWhereInput
    /**
     * Limit how many participant_histories to delete.
     */
    limit?: number
  }

  /**
   * participant_history without action
   */
  export type participant_historyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_history
     */
    select?: participant_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_history
     */
    omit?: participant_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_historyInclude<ExtArgs> | null
  }


  /**
   * Model questions
   */

  export type AggregateQuestions = {
    _count: QuestionsCountAggregateOutputType | null
    _avg: QuestionsAvgAggregateOutputType | null
    _sum: QuestionsSumAggregateOutputType | null
    _min: QuestionsMinAggregateOutputType | null
    _max: QuestionsMaxAggregateOutputType | null
  }

  export type QuestionsAvgAggregateOutputType = {
    id: number | null
    quiz_id: number | null
    time_limit: number | null
    points: number | null
  }

  export type QuestionsSumAggregateOutputType = {
    id: number | null
    quiz_id: number | null
    time_limit: number | null
    points: number | null
  }

  export type QuestionsMinAggregateOutputType = {
    id: number | null
    quiz_id: number | null
    type: $Enums.questions_type | null
    question: string | null
    correct_answer: string | null
    time_limit: number | null
    points: number | null
    category: string | null
    media_type: $Enums.questions_media_type | null
    media_url: string | null
  }

  export type QuestionsMaxAggregateOutputType = {
    id: number | null
    quiz_id: number | null
    type: $Enums.questions_type | null
    question: string | null
    correct_answer: string | null
    time_limit: number | null
    points: number | null
    category: string | null
    media_type: $Enums.questions_media_type | null
    media_url: string | null
  }

  export type QuestionsCountAggregateOutputType = {
    id: number
    quiz_id: number
    type: number
    question: number
    correct_answer: number
    time_limit: number
    points: number
    category: number
    media_type: number
    media_url: number
    _all: number
  }


  export type QuestionsAvgAggregateInputType = {
    id?: true
    quiz_id?: true
    time_limit?: true
    points?: true
  }

  export type QuestionsSumAggregateInputType = {
    id?: true
    quiz_id?: true
    time_limit?: true
    points?: true
  }

  export type QuestionsMinAggregateInputType = {
    id?: true
    quiz_id?: true
    type?: true
    question?: true
    correct_answer?: true
    time_limit?: true
    points?: true
    category?: true
    media_type?: true
    media_url?: true
  }

  export type QuestionsMaxAggregateInputType = {
    id?: true
    quiz_id?: true
    type?: true
    question?: true
    correct_answer?: true
    time_limit?: true
    points?: true
    category?: true
    media_type?: true
    media_url?: true
  }

  export type QuestionsCountAggregateInputType = {
    id?: true
    quiz_id?: true
    type?: true
    question?: true
    correct_answer?: true
    time_limit?: true
    points?: true
    category?: true
    media_type?: true
    media_url?: true
    _all?: true
  }

  export type QuestionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which questions to aggregate.
     */
    where?: questionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of questions to fetch.
     */
    orderBy?: questionsOrderByWithRelationInput | questionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: questionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned questions
    **/
    _count?: true | QuestionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionsMaxAggregateInputType
  }

  export type GetQuestionsAggregateType<T extends QuestionsAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestions[P]>
      : GetScalarType<T[P], AggregateQuestions[P]>
  }




  export type questionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: questionsWhereInput
    orderBy?: questionsOrderByWithAggregationInput | questionsOrderByWithAggregationInput[]
    by: QuestionsScalarFieldEnum[] | QuestionsScalarFieldEnum
    having?: questionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionsCountAggregateInputType | true
    _avg?: QuestionsAvgAggregateInputType
    _sum?: QuestionsSumAggregateInputType
    _min?: QuestionsMinAggregateInputType
    _max?: QuestionsMaxAggregateInputType
  }

  export type QuestionsGroupByOutputType = {
    id: number
    quiz_id: number
    type: $Enums.questions_type
    question: string
    correct_answer: string | null
    time_limit: number | null
    points: number | null
    category: string | null
    media_type: $Enums.questions_media_type | null
    media_url: string | null
    _count: QuestionsCountAggregateOutputType | null
    _avg: QuestionsAvgAggregateOutputType | null
    _sum: QuestionsSumAggregateOutputType | null
    _min: QuestionsMinAggregateOutputType | null
    _max: QuestionsMaxAggregateOutputType | null
  }

  type GetQuestionsGroupByPayload<T extends questionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionsGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionsGroupByOutputType[P]>
        }
      >
    >


  export type questionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quiz_id?: boolean
    type?: boolean
    question?: boolean
    correct_answer?: boolean
    time_limit?: boolean
    points?: boolean
    category?: boolean
    media_type?: boolean
    media_url?: boolean
    answers?: boolean | questions$answersArgs<ExtArgs>
    options?: boolean | questions$optionsArgs<ExtArgs>
    matching_pairs?: boolean | questions$matching_pairsArgs<ExtArgs>
    drag_drop_items?: boolean | questions$drag_drop_itemsArgs<ExtArgs>
    ordering_items?: boolean | questions$ordering_itemsArgs<ExtArgs>
    quizzes?: boolean | quizzesDefaultArgs<ExtArgs>
    _count?: boolean | QuestionsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questions"]>



  export type questionsSelectScalar = {
    id?: boolean
    quiz_id?: boolean
    type?: boolean
    question?: boolean
    correct_answer?: boolean
    time_limit?: boolean
    points?: boolean
    category?: boolean
    media_type?: boolean
    media_url?: boolean
  }

  export type questionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quiz_id" | "type" | "question" | "correct_answer" | "time_limit" | "points" | "category" | "media_type" | "media_url", ExtArgs["result"]["questions"]>
  export type questionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | questions$answersArgs<ExtArgs>
    options?: boolean | questions$optionsArgs<ExtArgs>
    matching_pairs?: boolean | questions$matching_pairsArgs<ExtArgs>
    drag_drop_items?: boolean | questions$drag_drop_itemsArgs<ExtArgs>
    ordering_items?: boolean | questions$ordering_itemsArgs<ExtArgs>
    quizzes?: boolean | quizzesDefaultArgs<ExtArgs>
    _count?: boolean | QuestionsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $questionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "questions"
    objects: {
      answers: Prisma.$answersPayload<ExtArgs>[]
      options: Prisma.$optionsPayload<ExtArgs>[]
      matching_pairs: Prisma.$matching_pairsPayload<ExtArgs>[]
      drag_drop_items: Prisma.$drag_drop_itemsPayload<ExtArgs>[]
      ordering_items: Prisma.$ordering_itemsPayload<ExtArgs>[]
      quizzes: Prisma.$quizzesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      quiz_id: number
      type: $Enums.questions_type
      question: string
      correct_answer: string | null
      time_limit: number | null
      points: number | null
      category: string | null
      media_type: $Enums.questions_media_type | null
      media_url: string | null
    }, ExtArgs["result"]["questions"]>
    composites: {}
  }

  type questionsGetPayload<S extends boolean | null | undefined | questionsDefaultArgs> = $Result.GetResult<Prisma.$questionsPayload, S>

  type questionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<questionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionsCountAggregateInputType | true
    }

  export interface questionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['questions'], meta: { name: 'questions' } }
    /**
     * Find zero or one Questions that matches the filter.
     * @param {questionsFindUniqueArgs} args - Arguments to find a Questions
     * @example
     * // Get one Questions
     * const questions = await prisma.questions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends questionsFindUniqueArgs>(args: SelectSubset<T, questionsFindUniqueArgs<ExtArgs>>): Prisma__questionsClient<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Questions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {questionsFindUniqueOrThrowArgs} args - Arguments to find a Questions
     * @example
     * // Get one Questions
     * const questions = await prisma.questions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends questionsFindUniqueOrThrowArgs>(args: SelectSubset<T, questionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__questionsClient<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {questionsFindFirstArgs} args - Arguments to find a Questions
     * @example
     * // Get one Questions
     * const questions = await prisma.questions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends questionsFindFirstArgs>(args?: SelectSubset<T, questionsFindFirstArgs<ExtArgs>>): Prisma__questionsClient<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Questions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {questionsFindFirstOrThrowArgs} args - Arguments to find a Questions
     * @example
     * // Get one Questions
     * const questions = await prisma.questions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends questionsFindFirstOrThrowArgs>(args?: SelectSubset<T, questionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__questionsClient<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {questionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.questions.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.questions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionsWithIdOnly = await prisma.questions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends questionsFindManyArgs>(args?: SelectSubset<T, questionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Questions.
     * @param {questionsCreateArgs} args - Arguments to create a Questions.
     * @example
     * // Create one Questions
     * const Questions = await prisma.questions.create({
     *   data: {
     *     // ... data to create a Questions
     *   }
     * })
     * 
     */
    create<T extends questionsCreateArgs>(args: SelectSubset<T, questionsCreateArgs<ExtArgs>>): Prisma__questionsClient<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Questions.
     * @param {questionsCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const questions = await prisma.questions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends questionsCreateManyArgs>(args?: SelectSubset<T, questionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Questions.
     * @param {questionsDeleteArgs} args - Arguments to delete one Questions.
     * @example
     * // Delete one Questions
     * const Questions = await prisma.questions.delete({
     *   where: {
     *     // ... filter to delete one Questions
     *   }
     * })
     * 
     */
    delete<T extends questionsDeleteArgs>(args: SelectSubset<T, questionsDeleteArgs<ExtArgs>>): Prisma__questionsClient<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Questions.
     * @param {questionsUpdateArgs} args - Arguments to update one Questions.
     * @example
     * // Update one Questions
     * const questions = await prisma.questions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends questionsUpdateArgs>(args: SelectSubset<T, questionsUpdateArgs<ExtArgs>>): Prisma__questionsClient<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Questions.
     * @param {questionsDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.questions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends questionsDeleteManyArgs>(args?: SelectSubset<T, questionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {questionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const questions = await prisma.questions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends questionsUpdateManyArgs>(args: SelectSubset<T, questionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Questions.
     * @param {questionsUpsertArgs} args - Arguments to update or create a Questions.
     * @example
     * // Update or create a Questions
     * const questions = await prisma.questions.upsert({
     *   create: {
     *     // ... data to create a Questions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Questions we want to update
     *   }
     * })
     */
    upsert<T extends questionsUpsertArgs>(args: SelectSubset<T, questionsUpsertArgs<ExtArgs>>): Prisma__questionsClient<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {questionsCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.questions.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends questionsCountArgs>(
      args?: Subset<T, questionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionsAggregateArgs>(args: Subset<T, QuestionsAggregateArgs>): Prisma.PrismaPromise<GetQuestionsAggregateType<T>>

    /**
     * Group by Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {questionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends questionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: questionsGroupByArgs['orderBy'] }
        : { orderBy?: questionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, questionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the questions model
   */
  readonly fields: questionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for questions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__questionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    answers<T extends questions$answersArgs<ExtArgs> = {}>(args?: Subset<T, questions$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$answersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    options<T extends questions$optionsArgs<ExtArgs> = {}>(args?: Subset<T, questions$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$optionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matching_pairs<T extends questions$matching_pairsArgs<ExtArgs> = {}>(args?: Subset<T, questions$matching_pairsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$matching_pairsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    drag_drop_items<T extends questions$drag_drop_itemsArgs<ExtArgs> = {}>(args?: Subset<T, questions$drag_drop_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$drag_drop_itemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ordering_items<T extends questions$ordering_itemsArgs<ExtArgs> = {}>(args?: Subset<T, questions$ordering_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ordering_itemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quizzes<T extends quizzesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, quizzesDefaultArgs<ExtArgs>>): Prisma__quizzesClient<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the questions model
   */
  interface questionsFieldRefs {
    readonly id: FieldRef<"questions", 'Int'>
    readonly quiz_id: FieldRef<"questions", 'Int'>
    readonly type: FieldRef<"questions", 'questions_type'>
    readonly question: FieldRef<"questions", 'String'>
    readonly correct_answer: FieldRef<"questions", 'String'>
    readonly time_limit: FieldRef<"questions", 'Int'>
    readonly points: FieldRef<"questions", 'Int'>
    readonly category: FieldRef<"questions", 'String'>
    readonly media_type: FieldRef<"questions", 'questions_media_type'>
    readonly media_url: FieldRef<"questions", 'String'>
  }
    

  // Custom InputTypes
  /**
   * questions findUnique
   */
  export type questionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the questions
     */
    select?: questionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the questions
     */
    omit?: questionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: questionsInclude<ExtArgs> | null
    /**
     * Filter, which questions to fetch.
     */
    where: questionsWhereUniqueInput
  }

  /**
   * questions findUniqueOrThrow
   */
  export type questionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the questions
     */
    select?: questionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the questions
     */
    omit?: questionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: questionsInclude<ExtArgs> | null
    /**
     * Filter, which questions to fetch.
     */
    where: questionsWhereUniqueInput
  }

  /**
   * questions findFirst
   */
  export type questionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the questions
     */
    select?: questionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the questions
     */
    omit?: questionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: questionsInclude<ExtArgs> | null
    /**
     * Filter, which questions to fetch.
     */
    where?: questionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of questions to fetch.
     */
    orderBy?: questionsOrderByWithRelationInput | questionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for questions.
     */
    cursor?: questionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of questions.
     */
    distinct?: QuestionsScalarFieldEnum | QuestionsScalarFieldEnum[]
  }

  /**
   * questions findFirstOrThrow
   */
  export type questionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the questions
     */
    select?: questionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the questions
     */
    omit?: questionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: questionsInclude<ExtArgs> | null
    /**
     * Filter, which questions to fetch.
     */
    where?: questionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of questions to fetch.
     */
    orderBy?: questionsOrderByWithRelationInput | questionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for questions.
     */
    cursor?: questionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of questions.
     */
    distinct?: QuestionsScalarFieldEnum | QuestionsScalarFieldEnum[]
  }

  /**
   * questions findMany
   */
  export type questionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the questions
     */
    select?: questionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the questions
     */
    omit?: questionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: questionsInclude<ExtArgs> | null
    /**
     * Filter, which questions to fetch.
     */
    where?: questionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of questions to fetch.
     */
    orderBy?: questionsOrderByWithRelationInput | questionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing questions.
     */
    cursor?: questionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` questions.
     */
    skip?: number
    distinct?: QuestionsScalarFieldEnum | QuestionsScalarFieldEnum[]
  }

  /**
   * questions create
   */
  export type questionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the questions
     */
    select?: questionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the questions
     */
    omit?: questionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: questionsInclude<ExtArgs> | null
    /**
     * The data needed to create a questions.
     */
    data: XOR<questionsCreateInput, questionsUncheckedCreateInput>
  }

  /**
   * questions createMany
   */
  export type questionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many questions.
     */
    data: questionsCreateManyInput | questionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * questions update
   */
  export type questionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the questions
     */
    select?: questionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the questions
     */
    omit?: questionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: questionsInclude<ExtArgs> | null
    /**
     * The data needed to update a questions.
     */
    data: XOR<questionsUpdateInput, questionsUncheckedUpdateInput>
    /**
     * Choose, which questions to update.
     */
    where: questionsWhereUniqueInput
  }

  /**
   * questions updateMany
   */
  export type questionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update questions.
     */
    data: XOR<questionsUpdateManyMutationInput, questionsUncheckedUpdateManyInput>
    /**
     * Filter which questions to update
     */
    where?: questionsWhereInput
    /**
     * Limit how many questions to update.
     */
    limit?: number
  }

  /**
   * questions upsert
   */
  export type questionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the questions
     */
    select?: questionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the questions
     */
    omit?: questionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: questionsInclude<ExtArgs> | null
    /**
     * The filter to search for the questions to update in case it exists.
     */
    where: questionsWhereUniqueInput
    /**
     * In case the questions found by the `where` argument doesn't exist, create a new questions with this data.
     */
    create: XOR<questionsCreateInput, questionsUncheckedCreateInput>
    /**
     * In case the questions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<questionsUpdateInput, questionsUncheckedUpdateInput>
  }

  /**
   * questions delete
   */
  export type questionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the questions
     */
    select?: questionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the questions
     */
    omit?: questionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: questionsInclude<ExtArgs> | null
    /**
     * Filter which questions to delete.
     */
    where: questionsWhereUniqueInput
  }

  /**
   * questions deleteMany
   */
  export type questionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which questions to delete
     */
    where?: questionsWhereInput
    /**
     * Limit how many questions to delete.
     */
    limit?: number
  }

  /**
   * questions.answers
   */
  export type questions$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the answers
     */
    select?: answersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the answers
     */
    omit?: answersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: answersInclude<ExtArgs> | null
    where?: answersWhereInput
    orderBy?: answersOrderByWithRelationInput | answersOrderByWithRelationInput[]
    cursor?: answersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnswersScalarFieldEnum | AnswersScalarFieldEnum[]
  }

  /**
   * questions.options
   */
  export type questions$optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the options
     */
    select?: optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the options
     */
    omit?: optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: optionsInclude<ExtArgs> | null
    where?: optionsWhereInput
    orderBy?: optionsOrderByWithRelationInput | optionsOrderByWithRelationInput[]
    cursor?: optionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OptionsScalarFieldEnum | OptionsScalarFieldEnum[]
  }

  /**
   * questions.matching_pairs
   */
  export type questions$matching_pairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the matching_pairs
     */
    select?: matching_pairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the matching_pairs
     */
    omit?: matching_pairsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: matching_pairsInclude<ExtArgs> | null
    where?: matching_pairsWhereInput
    orderBy?: matching_pairsOrderByWithRelationInput | matching_pairsOrderByWithRelationInput[]
    cursor?: matching_pairsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Matching_pairsScalarFieldEnum | Matching_pairsScalarFieldEnum[]
  }

  /**
   * questions.drag_drop_items
   */
  export type questions$drag_drop_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drag_drop_items
     */
    select?: drag_drop_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drag_drop_items
     */
    omit?: drag_drop_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: drag_drop_itemsInclude<ExtArgs> | null
    where?: drag_drop_itemsWhereInput
    orderBy?: drag_drop_itemsOrderByWithRelationInput | drag_drop_itemsOrderByWithRelationInput[]
    cursor?: drag_drop_itemsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Drag_drop_itemsScalarFieldEnum | Drag_drop_itemsScalarFieldEnum[]
  }

  /**
   * questions.ordering_items
   */
  export type questions$ordering_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ordering_items
     */
    select?: ordering_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ordering_items
     */
    omit?: ordering_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ordering_itemsInclude<ExtArgs> | null
    where?: ordering_itemsWhereInput
    orderBy?: ordering_itemsOrderByWithRelationInput | ordering_itemsOrderByWithRelationInput[]
    cursor?: ordering_itemsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Ordering_itemsScalarFieldEnum | Ordering_itemsScalarFieldEnum[]
  }

  /**
   * questions without action
   */
  export type questionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the questions
     */
    select?: questionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the questions
     */
    omit?: questionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: questionsInclude<ExtArgs> | null
  }


  /**
   * Model quiz_sessions
   */

  export type AggregateQuiz_sessions = {
    _count: Quiz_sessionsCountAggregateOutputType | null
    _avg: Quiz_sessionsAvgAggregateOutputType | null
    _sum: Quiz_sessionsSumAggregateOutputType | null
    _min: Quiz_sessionsMinAggregateOutputType | null
    _max: Quiz_sessionsMaxAggregateOutputType | null
  }

  export type Quiz_sessionsAvgAggregateOutputType = {
    id: number | null
    quiz_id: number | null
    host_id: number | null
  }

  export type Quiz_sessionsSumAggregateOutputType = {
    id: number | null
    quiz_id: number | null
    host_id: number | null
  }

  export type Quiz_sessionsMinAggregateOutputType = {
    id: number | null
    quiz_id: number | null
    host_id: number | null
    code: string | null
    status: $Enums.quiz_sessions_status | null
    started_at: Date | null
    ended_at: Date | null
  }

  export type Quiz_sessionsMaxAggregateOutputType = {
    id: number | null
    quiz_id: number | null
    host_id: number | null
    code: string | null
    status: $Enums.quiz_sessions_status | null
    started_at: Date | null
    ended_at: Date | null
  }

  export type Quiz_sessionsCountAggregateOutputType = {
    id: number
    quiz_id: number
    host_id: number
    code: number
    status: number
    started_at: number
    ended_at: number
    _all: number
  }


  export type Quiz_sessionsAvgAggregateInputType = {
    id?: true
    quiz_id?: true
    host_id?: true
  }

  export type Quiz_sessionsSumAggregateInputType = {
    id?: true
    quiz_id?: true
    host_id?: true
  }

  export type Quiz_sessionsMinAggregateInputType = {
    id?: true
    quiz_id?: true
    host_id?: true
    code?: true
    status?: true
    started_at?: true
    ended_at?: true
  }

  export type Quiz_sessionsMaxAggregateInputType = {
    id?: true
    quiz_id?: true
    host_id?: true
    code?: true
    status?: true
    started_at?: true
    ended_at?: true
  }

  export type Quiz_sessionsCountAggregateInputType = {
    id?: true
    quiz_id?: true
    host_id?: true
    code?: true
    status?: true
    started_at?: true
    ended_at?: true
    _all?: true
  }

  export type Quiz_sessionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which quiz_sessions to aggregate.
     */
    where?: quiz_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of quiz_sessions to fetch.
     */
    orderBy?: quiz_sessionsOrderByWithRelationInput | quiz_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: quiz_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` quiz_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` quiz_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned quiz_sessions
    **/
    _count?: true | Quiz_sessionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Quiz_sessionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Quiz_sessionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Quiz_sessionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Quiz_sessionsMaxAggregateInputType
  }

  export type GetQuiz_sessionsAggregateType<T extends Quiz_sessionsAggregateArgs> = {
        [P in keyof T & keyof AggregateQuiz_sessions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuiz_sessions[P]>
      : GetScalarType<T[P], AggregateQuiz_sessions[P]>
  }




  export type quiz_sessionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: quiz_sessionsWhereInput
    orderBy?: quiz_sessionsOrderByWithAggregationInput | quiz_sessionsOrderByWithAggregationInput[]
    by: Quiz_sessionsScalarFieldEnum[] | Quiz_sessionsScalarFieldEnum
    having?: quiz_sessionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Quiz_sessionsCountAggregateInputType | true
    _avg?: Quiz_sessionsAvgAggregateInputType
    _sum?: Quiz_sessionsSumAggregateInputType
    _min?: Quiz_sessionsMinAggregateInputType
    _max?: Quiz_sessionsMaxAggregateInputType
  }

  export type Quiz_sessionsGroupByOutputType = {
    id: number
    quiz_id: number
    host_id: number
    code: string
    status: $Enums.quiz_sessions_status | null
    started_at: Date | null
    ended_at: Date | null
    _count: Quiz_sessionsCountAggregateOutputType | null
    _avg: Quiz_sessionsAvgAggregateOutputType | null
    _sum: Quiz_sessionsSumAggregateOutputType | null
    _min: Quiz_sessionsMinAggregateOutputType | null
    _max: Quiz_sessionsMaxAggregateOutputType | null
  }

  type GetQuiz_sessionsGroupByPayload<T extends quiz_sessionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Quiz_sessionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Quiz_sessionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Quiz_sessionsGroupByOutputType[P]>
            : GetScalarType<T[P], Quiz_sessionsGroupByOutputType[P]>
        }
      >
    >


  export type quiz_sessionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quiz_id?: boolean
    host_id?: boolean
    code?: boolean
    status?: boolean
    started_at?: boolean
    ended_at?: boolean
    quizzes?: boolean | quizzesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    session_participants?: boolean | quiz_sessions$session_participantsArgs<ExtArgs>
    _count?: boolean | Quiz_sessionsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz_sessions"]>



  export type quiz_sessionsSelectScalar = {
    id?: boolean
    quiz_id?: boolean
    host_id?: boolean
    code?: boolean
    status?: boolean
    started_at?: boolean
    ended_at?: boolean
  }

  export type quiz_sessionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quiz_id" | "host_id" | "code" | "status" | "started_at" | "ended_at", ExtArgs["result"]["quiz_sessions"]>
  export type quiz_sessionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quizzes?: boolean | quizzesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    session_participants?: boolean | quiz_sessions$session_participantsArgs<ExtArgs>
    _count?: boolean | Quiz_sessionsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $quiz_sessionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "quiz_sessions"
    objects: {
      quizzes: Prisma.$quizzesPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
      session_participants: Prisma.$session_participantsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      quiz_id: number
      host_id: number
      code: string
      status: $Enums.quiz_sessions_status | null
      started_at: Date | null
      ended_at: Date | null
    }, ExtArgs["result"]["quiz_sessions"]>
    composites: {}
  }

  type quiz_sessionsGetPayload<S extends boolean | null | undefined | quiz_sessionsDefaultArgs> = $Result.GetResult<Prisma.$quiz_sessionsPayload, S>

  type quiz_sessionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<quiz_sessionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Quiz_sessionsCountAggregateInputType | true
    }

  export interface quiz_sessionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['quiz_sessions'], meta: { name: 'quiz_sessions' } }
    /**
     * Find zero or one Quiz_sessions that matches the filter.
     * @param {quiz_sessionsFindUniqueArgs} args - Arguments to find a Quiz_sessions
     * @example
     * // Get one Quiz_sessions
     * const quiz_sessions = await prisma.quiz_sessions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends quiz_sessionsFindUniqueArgs>(args: SelectSubset<T, quiz_sessionsFindUniqueArgs<ExtArgs>>): Prisma__quiz_sessionsClient<$Result.GetResult<Prisma.$quiz_sessionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Quiz_sessions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {quiz_sessionsFindUniqueOrThrowArgs} args - Arguments to find a Quiz_sessions
     * @example
     * // Get one Quiz_sessions
     * const quiz_sessions = await prisma.quiz_sessions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends quiz_sessionsFindUniqueOrThrowArgs>(args: SelectSubset<T, quiz_sessionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__quiz_sessionsClient<$Result.GetResult<Prisma.$quiz_sessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quiz_sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quiz_sessionsFindFirstArgs} args - Arguments to find a Quiz_sessions
     * @example
     * // Get one Quiz_sessions
     * const quiz_sessions = await prisma.quiz_sessions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends quiz_sessionsFindFirstArgs>(args?: SelectSubset<T, quiz_sessionsFindFirstArgs<ExtArgs>>): Prisma__quiz_sessionsClient<$Result.GetResult<Prisma.$quiz_sessionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quiz_sessions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quiz_sessionsFindFirstOrThrowArgs} args - Arguments to find a Quiz_sessions
     * @example
     * // Get one Quiz_sessions
     * const quiz_sessions = await prisma.quiz_sessions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends quiz_sessionsFindFirstOrThrowArgs>(args?: SelectSubset<T, quiz_sessionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__quiz_sessionsClient<$Result.GetResult<Prisma.$quiz_sessionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Quiz_sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quiz_sessionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quiz_sessions
     * const quiz_sessions = await prisma.quiz_sessions.findMany()
     * 
     * // Get first 10 Quiz_sessions
     * const quiz_sessions = await prisma.quiz_sessions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quiz_sessionsWithIdOnly = await prisma.quiz_sessions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends quiz_sessionsFindManyArgs>(args?: SelectSubset<T, quiz_sessionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$quiz_sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Quiz_sessions.
     * @param {quiz_sessionsCreateArgs} args - Arguments to create a Quiz_sessions.
     * @example
     * // Create one Quiz_sessions
     * const Quiz_sessions = await prisma.quiz_sessions.create({
     *   data: {
     *     // ... data to create a Quiz_sessions
     *   }
     * })
     * 
     */
    create<T extends quiz_sessionsCreateArgs>(args: SelectSubset<T, quiz_sessionsCreateArgs<ExtArgs>>): Prisma__quiz_sessionsClient<$Result.GetResult<Prisma.$quiz_sessionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Quiz_sessions.
     * @param {quiz_sessionsCreateManyArgs} args - Arguments to create many Quiz_sessions.
     * @example
     * // Create many Quiz_sessions
     * const quiz_sessions = await prisma.quiz_sessions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends quiz_sessionsCreateManyArgs>(args?: SelectSubset<T, quiz_sessionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Quiz_sessions.
     * @param {quiz_sessionsDeleteArgs} args - Arguments to delete one Quiz_sessions.
     * @example
     * // Delete one Quiz_sessions
     * const Quiz_sessions = await prisma.quiz_sessions.delete({
     *   where: {
     *     // ... filter to delete one Quiz_sessions
     *   }
     * })
     * 
     */
    delete<T extends quiz_sessionsDeleteArgs>(args: SelectSubset<T, quiz_sessionsDeleteArgs<ExtArgs>>): Prisma__quiz_sessionsClient<$Result.GetResult<Prisma.$quiz_sessionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Quiz_sessions.
     * @param {quiz_sessionsUpdateArgs} args - Arguments to update one Quiz_sessions.
     * @example
     * // Update one Quiz_sessions
     * const quiz_sessions = await prisma.quiz_sessions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends quiz_sessionsUpdateArgs>(args: SelectSubset<T, quiz_sessionsUpdateArgs<ExtArgs>>): Prisma__quiz_sessionsClient<$Result.GetResult<Prisma.$quiz_sessionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Quiz_sessions.
     * @param {quiz_sessionsDeleteManyArgs} args - Arguments to filter Quiz_sessions to delete.
     * @example
     * // Delete a few Quiz_sessions
     * const { count } = await prisma.quiz_sessions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends quiz_sessionsDeleteManyArgs>(args?: SelectSubset<T, quiz_sessionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quiz_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quiz_sessionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quiz_sessions
     * const quiz_sessions = await prisma.quiz_sessions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends quiz_sessionsUpdateManyArgs>(args: SelectSubset<T, quiz_sessionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Quiz_sessions.
     * @param {quiz_sessionsUpsertArgs} args - Arguments to update or create a Quiz_sessions.
     * @example
     * // Update or create a Quiz_sessions
     * const quiz_sessions = await prisma.quiz_sessions.upsert({
     *   create: {
     *     // ... data to create a Quiz_sessions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quiz_sessions we want to update
     *   }
     * })
     */
    upsert<T extends quiz_sessionsUpsertArgs>(args: SelectSubset<T, quiz_sessionsUpsertArgs<ExtArgs>>): Prisma__quiz_sessionsClient<$Result.GetResult<Prisma.$quiz_sessionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Quiz_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quiz_sessionsCountArgs} args - Arguments to filter Quiz_sessions to count.
     * @example
     * // Count the number of Quiz_sessions
     * const count = await prisma.quiz_sessions.count({
     *   where: {
     *     // ... the filter for the Quiz_sessions we want to count
     *   }
     * })
    **/
    count<T extends quiz_sessionsCountArgs>(
      args?: Subset<T, quiz_sessionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Quiz_sessionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quiz_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quiz_sessionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Quiz_sessionsAggregateArgs>(args: Subset<T, Quiz_sessionsAggregateArgs>): Prisma.PrismaPromise<GetQuiz_sessionsAggregateType<T>>

    /**
     * Group by Quiz_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quiz_sessionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends quiz_sessionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: quiz_sessionsGroupByArgs['orderBy'] }
        : { orderBy?: quiz_sessionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, quiz_sessionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuiz_sessionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the quiz_sessions model
   */
  readonly fields: quiz_sessionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for quiz_sessions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__quiz_sessionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quizzes<T extends quizzesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, quizzesDefaultArgs<ExtArgs>>): Prisma__quizzesClient<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    session_participants<T extends quiz_sessions$session_participantsArgs<ExtArgs> = {}>(args?: Subset<T, quiz_sessions$session_participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$session_participantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the quiz_sessions model
   */
  interface quiz_sessionsFieldRefs {
    readonly id: FieldRef<"quiz_sessions", 'Int'>
    readonly quiz_id: FieldRef<"quiz_sessions", 'Int'>
    readonly host_id: FieldRef<"quiz_sessions", 'Int'>
    readonly code: FieldRef<"quiz_sessions", 'String'>
    readonly status: FieldRef<"quiz_sessions", 'quiz_sessions_status'>
    readonly started_at: FieldRef<"quiz_sessions", 'DateTime'>
    readonly ended_at: FieldRef<"quiz_sessions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * quiz_sessions findUnique
   */
  export type quiz_sessionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz_sessions
     */
    select?: quiz_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz_sessions
     */
    omit?: quiz_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quiz_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which quiz_sessions to fetch.
     */
    where: quiz_sessionsWhereUniqueInput
  }

  /**
   * quiz_sessions findUniqueOrThrow
   */
  export type quiz_sessionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz_sessions
     */
    select?: quiz_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz_sessions
     */
    omit?: quiz_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quiz_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which quiz_sessions to fetch.
     */
    where: quiz_sessionsWhereUniqueInput
  }

  /**
   * quiz_sessions findFirst
   */
  export type quiz_sessionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz_sessions
     */
    select?: quiz_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz_sessions
     */
    omit?: quiz_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quiz_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which quiz_sessions to fetch.
     */
    where?: quiz_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of quiz_sessions to fetch.
     */
    orderBy?: quiz_sessionsOrderByWithRelationInput | quiz_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for quiz_sessions.
     */
    cursor?: quiz_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` quiz_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` quiz_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of quiz_sessions.
     */
    distinct?: Quiz_sessionsScalarFieldEnum | Quiz_sessionsScalarFieldEnum[]
  }

  /**
   * quiz_sessions findFirstOrThrow
   */
  export type quiz_sessionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz_sessions
     */
    select?: quiz_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz_sessions
     */
    omit?: quiz_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quiz_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which quiz_sessions to fetch.
     */
    where?: quiz_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of quiz_sessions to fetch.
     */
    orderBy?: quiz_sessionsOrderByWithRelationInput | quiz_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for quiz_sessions.
     */
    cursor?: quiz_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` quiz_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` quiz_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of quiz_sessions.
     */
    distinct?: Quiz_sessionsScalarFieldEnum | Quiz_sessionsScalarFieldEnum[]
  }

  /**
   * quiz_sessions findMany
   */
  export type quiz_sessionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz_sessions
     */
    select?: quiz_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz_sessions
     */
    omit?: quiz_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quiz_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which quiz_sessions to fetch.
     */
    where?: quiz_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of quiz_sessions to fetch.
     */
    orderBy?: quiz_sessionsOrderByWithRelationInput | quiz_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing quiz_sessions.
     */
    cursor?: quiz_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` quiz_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` quiz_sessions.
     */
    skip?: number
    distinct?: Quiz_sessionsScalarFieldEnum | Quiz_sessionsScalarFieldEnum[]
  }

  /**
   * quiz_sessions create
   */
  export type quiz_sessionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz_sessions
     */
    select?: quiz_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz_sessions
     */
    omit?: quiz_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quiz_sessionsInclude<ExtArgs> | null
    /**
     * The data needed to create a quiz_sessions.
     */
    data: XOR<quiz_sessionsCreateInput, quiz_sessionsUncheckedCreateInput>
  }

  /**
   * quiz_sessions createMany
   */
  export type quiz_sessionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many quiz_sessions.
     */
    data: quiz_sessionsCreateManyInput | quiz_sessionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * quiz_sessions update
   */
  export type quiz_sessionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz_sessions
     */
    select?: quiz_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz_sessions
     */
    omit?: quiz_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quiz_sessionsInclude<ExtArgs> | null
    /**
     * The data needed to update a quiz_sessions.
     */
    data: XOR<quiz_sessionsUpdateInput, quiz_sessionsUncheckedUpdateInput>
    /**
     * Choose, which quiz_sessions to update.
     */
    where: quiz_sessionsWhereUniqueInput
  }

  /**
   * quiz_sessions updateMany
   */
  export type quiz_sessionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update quiz_sessions.
     */
    data: XOR<quiz_sessionsUpdateManyMutationInput, quiz_sessionsUncheckedUpdateManyInput>
    /**
     * Filter which quiz_sessions to update
     */
    where?: quiz_sessionsWhereInput
    /**
     * Limit how many quiz_sessions to update.
     */
    limit?: number
  }

  /**
   * quiz_sessions upsert
   */
  export type quiz_sessionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz_sessions
     */
    select?: quiz_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz_sessions
     */
    omit?: quiz_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quiz_sessionsInclude<ExtArgs> | null
    /**
     * The filter to search for the quiz_sessions to update in case it exists.
     */
    where: quiz_sessionsWhereUniqueInput
    /**
     * In case the quiz_sessions found by the `where` argument doesn't exist, create a new quiz_sessions with this data.
     */
    create: XOR<quiz_sessionsCreateInput, quiz_sessionsUncheckedCreateInput>
    /**
     * In case the quiz_sessions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<quiz_sessionsUpdateInput, quiz_sessionsUncheckedUpdateInput>
  }

  /**
   * quiz_sessions delete
   */
  export type quiz_sessionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz_sessions
     */
    select?: quiz_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz_sessions
     */
    omit?: quiz_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quiz_sessionsInclude<ExtArgs> | null
    /**
     * Filter which quiz_sessions to delete.
     */
    where: quiz_sessionsWhereUniqueInput
  }

  /**
   * quiz_sessions deleteMany
   */
  export type quiz_sessionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which quiz_sessions to delete
     */
    where?: quiz_sessionsWhereInput
    /**
     * Limit how many quiz_sessions to delete.
     */
    limit?: number
  }

  /**
   * quiz_sessions.session_participants
   */
  export type quiz_sessions$session_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session_participants
     */
    select?: session_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session_participants
     */
    omit?: session_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: session_participantsInclude<ExtArgs> | null
    where?: session_participantsWhereInput
    orderBy?: session_participantsOrderByWithRelationInput | session_participantsOrderByWithRelationInput[]
    cursor?: session_participantsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Session_participantsScalarFieldEnum | Session_participantsScalarFieldEnum[]
  }

  /**
   * quiz_sessions without action
   */
  export type quiz_sessionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz_sessions
     */
    select?: quiz_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz_sessions
     */
    omit?: quiz_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quiz_sessionsInclude<ExtArgs> | null
  }


  /**
   * Model quizzes
   */

  export type AggregateQuizzes = {
    _count: QuizzesCountAggregateOutputType | null
    _avg: QuizzesAvgAggregateOutputType | null
    _sum: QuizzesSumAggregateOutputType | null
    _min: QuizzesMinAggregateOutputType | null
    _max: QuizzesMaxAggregateOutputType | null
  }

  export type QuizzesAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type QuizzesSumAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type QuizzesMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    title: string | null
    description: string | null
    negative_marking: boolean | null
    team_mode: boolean | null
    status: $Enums.quizzes_status | null
    created_at: Date | null
  }

  export type QuizzesMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    title: string | null
    description: string | null
    negative_marking: boolean | null
    team_mode: boolean | null
    status: $Enums.quizzes_status | null
    created_at: Date | null
  }

  export type QuizzesCountAggregateOutputType = {
    id: number
    user_id: number
    title: number
    description: number
    negative_marking: number
    team_mode: number
    status: number
    created_at: number
    _all: number
  }


  export type QuizzesAvgAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type QuizzesSumAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type QuizzesMinAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    description?: true
    negative_marking?: true
    team_mode?: true
    status?: true
    created_at?: true
  }

  export type QuizzesMaxAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    description?: true
    negative_marking?: true
    team_mode?: true
    status?: true
    created_at?: true
  }

  export type QuizzesCountAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    description?: true
    negative_marking?: true
    team_mode?: true
    status?: true
    created_at?: true
    _all?: true
  }

  export type QuizzesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which quizzes to aggregate.
     */
    where?: quizzesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of quizzes to fetch.
     */
    orderBy?: quizzesOrderByWithRelationInput | quizzesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: quizzesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned quizzes
    **/
    _count?: true | QuizzesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuizzesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuizzesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizzesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizzesMaxAggregateInputType
  }

  export type GetQuizzesAggregateType<T extends QuizzesAggregateArgs> = {
        [P in keyof T & keyof AggregateQuizzes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuizzes[P]>
      : GetScalarType<T[P], AggregateQuizzes[P]>
  }




  export type quizzesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: quizzesWhereInput
    orderBy?: quizzesOrderByWithAggregationInput | quizzesOrderByWithAggregationInput[]
    by: QuizzesScalarFieldEnum[] | QuizzesScalarFieldEnum
    having?: quizzesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizzesCountAggregateInputType | true
    _avg?: QuizzesAvgAggregateInputType
    _sum?: QuizzesSumAggregateInputType
    _min?: QuizzesMinAggregateInputType
    _max?: QuizzesMaxAggregateInputType
  }

  export type QuizzesGroupByOutputType = {
    id: number
    user_id: number
    title: string
    description: string | null
    negative_marking: boolean | null
    team_mode: boolean | null
    status: $Enums.quizzes_status | null
    created_at: Date | null
    _count: QuizzesCountAggregateOutputType | null
    _avg: QuizzesAvgAggregateOutputType | null
    _sum: QuizzesSumAggregateOutputType | null
    _min: QuizzesMinAggregateOutputType | null
    _max: QuizzesMaxAggregateOutputType | null
  }

  type GetQuizzesGroupByPayload<T extends quizzesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizzesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizzesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizzesGroupByOutputType[P]>
            : GetScalarType<T[P], QuizzesGroupByOutputType[P]>
        }
      >
    >


  export type quizzesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    description?: boolean
    negative_marking?: boolean
    team_mode?: boolean
    status?: boolean
    created_at?: boolean
    participant_history?: boolean | quizzes$participant_historyArgs<ExtArgs>
    questions?: boolean | quizzes$questionsArgs<ExtArgs>
    quiz_sessions?: boolean | quizzes$quiz_sessionsArgs<ExtArgs>
    teams?: boolean | quizzes$teamsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | QuizzesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizzes"]>



  export type quizzesSelectScalar = {
    id?: boolean
    user_id?: boolean
    title?: boolean
    description?: boolean
    negative_marking?: boolean
    team_mode?: boolean
    status?: boolean
    created_at?: boolean
  }

  export type quizzesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "title" | "description" | "negative_marking" | "team_mode" | "status" | "created_at", ExtArgs["result"]["quizzes"]>
  export type quizzesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant_history?: boolean | quizzes$participant_historyArgs<ExtArgs>
    questions?: boolean | quizzes$questionsArgs<ExtArgs>
    quiz_sessions?: boolean | quizzes$quiz_sessionsArgs<ExtArgs>
    teams?: boolean | quizzes$teamsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | QuizzesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $quizzesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "quizzes"
    objects: {
      participant_history: Prisma.$participant_historyPayload<ExtArgs>[]
      questions: Prisma.$questionsPayload<ExtArgs>[]
      quiz_sessions: Prisma.$quiz_sessionsPayload<ExtArgs>[]
      teams: Prisma.$teamsPayload<ExtArgs>[]
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      title: string
      description: string | null
      negative_marking: boolean | null
      team_mode: boolean | null
      status: $Enums.quizzes_status | null
      created_at: Date | null
    }, ExtArgs["result"]["quizzes"]>
    composites: {}
  }

  type quizzesGetPayload<S extends boolean | null | undefined | quizzesDefaultArgs> = $Result.GetResult<Prisma.$quizzesPayload, S>

  type quizzesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<quizzesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizzesCountAggregateInputType | true
    }

  export interface quizzesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['quizzes'], meta: { name: 'quizzes' } }
    /**
     * Find zero or one Quizzes that matches the filter.
     * @param {quizzesFindUniqueArgs} args - Arguments to find a Quizzes
     * @example
     * // Get one Quizzes
     * const quizzes = await prisma.quizzes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends quizzesFindUniqueArgs>(args: SelectSubset<T, quizzesFindUniqueArgs<ExtArgs>>): Prisma__quizzesClient<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Quizzes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {quizzesFindUniqueOrThrowArgs} args - Arguments to find a Quizzes
     * @example
     * // Get one Quizzes
     * const quizzes = await prisma.quizzes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends quizzesFindUniqueOrThrowArgs>(args: SelectSubset<T, quizzesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__quizzesClient<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quizzes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quizzesFindFirstArgs} args - Arguments to find a Quizzes
     * @example
     * // Get one Quizzes
     * const quizzes = await prisma.quizzes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends quizzesFindFirstArgs>(args?: SelectSubset<T, quizzesFindFirstArgs<ExtArgs>>): Prisma__quizzesClient<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quizzes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quizzesFindFirstOrThrowArgs} args - Arguments to find a Quizzes
     * @example
     * // Get one Quizzes
     * const quizzes = await prisma.quizzes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends quizzesFindFirstOrThrowArgs>(args?: SelectSubset<T, quizzesFindFirstOrThrowArgs<ExtArgs>>): Prisma__quizzesClient<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Quizzes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quizzesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quizzes
     * const quizzes = await prisma.quizzes.findMany()
     * 
     * // Get first 10 Quizzes
     * const quizzes = await prisma.quizzes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizzesWithIdOnly = await prisma.quizzes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends quizzesFindManyArgs>(args?: SelectSubset<T, quizzesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Quizzes.
     * @param {quizzesCreateArgs} args - Arguments to create a Quizzes.
     * @example
     * // Create one Quizzes
     * const Quizzes = await prisma.quizzes.create({
     *   data: {
     *     // ... data to create a Quizzes
     *   }
     * })
     * 
     */
    create<T extends quizzesCreateArgs>(args: SelectSubset<T, quizzesCreateArgs<ExtArgs>>): Prisma__quizzesClient<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Quizzes.
     * @param {quizzesCreateManyArgs} args - Arguments to create many Quizzes.
     * @example
     * // Create many Quizzes
     * const quizzes = await prisma.quizzes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends quizzesCreateManyArgs>(args?: SelectSubset<T, quizzesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Quizzes.
     * @param {quizzesDeleteArgs} args - Arguments to delete one Quizzes.
     * @example
     * // Delete one Quizzes
     * const Quizzes = await prisma.quizzes.delete({
     *   where: {
     *     // ... filter to delete one Quizzes
     *   }
     * })
     * 
     */
    delete<T extends quizzesDeleteArgs>(args: SelectSubset<T, quizzesDeleteArgs<ExtArgs>>): Prisma__quizzesClient<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Quizzes.
     * @param {quizzesUpdateArgs} args - Arguments to update one Quizzes.
     * @example
     * // Update one Quizzes
     * const quizzes = await prisma.quizzes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends quizzesUpdateArgs>(args: SelectSubset<T, quizzesUpdateArgs<ExtArgs>>): Prisma__quizzesClient<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Quizzes.
     * @param {quizzesDeleteManyArgs} args - Arguments to filter Quizzes to delete.
     * @example
     * // Delete a few Quizzes
     * const { count } = await prisma.quizzes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends quizzesDeleteManyArgs>(args?: SelectSubset<T, quizzesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quizzesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quizzes
     * const quizzes = await prisma.quizzes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends quizzesUpdateManyArgs>(args: SelectSubset<T, quizzesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Quizzes.
     * @param {quizzesUpsertArgs} args - Arguments to update or create a Quizzes.
     * @example
     * // Update or create a Quizzes
     * const quizzes = await prisma.quizzes.upsert({
     *   create: {
     *     // ... data to create a Quizzes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quizzes we want to update
     *   }
     * })
     */
    upsert<T extends quizzesUpsertArgs>(args: SelectSubset<T, quizzesUpsertArgs<ExtArgs>>): Prisma__quizzesClient<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quizzesCountArgs} args - Arguments to filter Quizzes to count.
     * @example
     * // Count the number of Quizzes
     * const count = await prisma.quizzes.count({
     *   where: {
     *     // ... the filter for the Quizzes we want to count
     *   }
     * })
    **/
    count<T extends quizzesCountArgs>(
      args?: Subset<T, quizzesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizzesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizzesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuizzesAggregateArgs>(args: Subset<T, QuizzesAggregateArgs>): Prisma.PrismaPromise<GetQuizzesAggregateType<T>>

    /**
     * Group by Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quizzesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends quizzesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: quizzesGroupByArgs['orderBy'] }
        : { orderBy?: quizzesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, quizzesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizzesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the quizzes model
   */
  readonly fields: quizzesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for quizzes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__quizzesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participant_history<T extends quizzes$participant_historyArgs<ExtArgs> = {}>(args?: Subset<T, quizzes$participant_historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participant_historyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    questions<T extends quizzes$questionsArgs<ExtArgs> = {}>(args?: Subset<T, quizzes$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$questionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quiz_sessions<T extends quizzes$quiz_sessionsArgs<ExtArgs> = {}>(args?: Subset<T, quizzes$quiz_sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$quiz_sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teams<T extends quizzes$teamsArgs<ExtArgs> = {}>(args?: Subset<T, quizzes$teamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the quizzes model
   */
  interface quizzesFieldRefs {
    readonly id: FieldRef<"quizzes", 'Int'>
    readonly user_id: FieldRef<"quizzes", 'Int'>
    readonly title: FieldRef<"quizzes", 'String'>
    readonly description: FieldRef<"quizzes", 'String'>
    readonly negative_marking: FieldRef<"quizzes", 'Boolean'>
    readonly team_mode: FieldRef<"quizzes", 'Boolean'>
    readonly status: FieldRef<"quizzes", 'quizzes_status'>
    readonly created_at: FieldRef<"quizzes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * quizzes findUnique
   */
  export type quizzesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quizzes
     */
    select?: quizzesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quizzes
     */
    omit?: quizzesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizzesInclude<ExtArgs> | null
    /**
     * Filter, which quizzes to fetch.
     */
    where: quizzesWhereUniqueInput
  }

  /**
   * quizzes findUniqueOrThrow
   */
  export type quizzesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quizzes
     */
    select?: quizzesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quizzes
     */
    omit?: quizzesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizzesInclude<ExtArgs> | null
    /**
     * Filter, which quizzes to fetch.
     */
    where: quizzesWhereUniqueInput
  }

  /**
   * quizzes findFirst
   */
  export type quizzesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quizzes
     */
    select?: quizzesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quizzes
     */
    omit?: quizzesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizzesInclude<ExtArgs> | null
    /**
     * Filter, which quizzes to fetch.
     */
    where?: quizzesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of quizzes to fetch.
     */
    orderBy?: quizzesOrderByWithRelationInput | quizzesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for quizzes.
     */
    cursor?: quizzesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of quizzes.
     */
    distinct?: QuizzesScalarFieldEnum | QuizzesScalarFieldEnum[]
  }

  /**
   * quizzes findFirstOrThrow
   */
  export type quizzesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quizzes
     */
    select?: quizzesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quizzes
     */
    omit?: quizzesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizzesInclude<ExtArgs> | null
    /**
     * Filter, which quizzes to fetch.
     */
    where?: quizzesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of quizzes to fetch.
     */
    orderBy?: quizzesOrderByWithRelationInput | quizzesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for quizzes.
     */
    cursor?: quizzesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of quizzes.
     */
    distinct?: QuizzesScalarFieldEnum | QuizzesScalarFieldEnum[]
  }

  /**
   * quizzes findMany
   */
  export type quizzesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quizzes
     */
    select?: quizzesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quizzes
     */
    omit?: quizzesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizzesInclude<ExtArgs> | null
    /**
     * Filter, which quizzes to fetch.
     */
    where?: quizzesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of quizzes to fetch.
     */
    orderBy?: quizzesOrderByWithRelationInput | quizzesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing quizzes.
     */
    cursor?: quizzesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` quizzes.
     */
    skip?: number
    distinct?: QuizzesScalarFieldEnum | QuizzesScalarFieldEnum[]
  }

  /**
   * quizzes create
   */
  export type quizzesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quizzes
     */
    select?: quizzesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quizzes
     */
    omit?: quizzesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizzesInclude<ExtArgs> | null
    /**
     * The data needed to create a quizzes.
     */
    data: XOR<quizzesCreateInput, quizzesUncheckedCreateInput>
  }

  /**
   * quizzes createMany
   */
  export type quizzesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many quizzes.
     */
    data: quizzesCreateManyInput | quizzesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * quizzes update
   */
  export type quizzesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quizzes
     */
    select?: quizzesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quizzes
     */
    omit?: quizzesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizzesInclude<ExtArgs> | null
    /**
     * The data needed to update a quizzes.
     */
    data: XOR<quizzesUpdateInput, quizzesUncheckedUpdateInput>
    /**
     * Choose, which quizzes to update.
     */
    where: quizzesWhereUniqueInput
  }

  /**
   * quizzes updateMany
   */
  export type quizzesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update quizzes.
     */
    data: XOR<quizzesUpdateManyMutationInput, quizzesUncheckedUpdateManyInput>
    /**
     * Filter which quizzes to update
     */
    where?: quizzesWhereInput
    /**
     * Limit how many quizzes to update.
     */
    limit?: number
  }

  /**
   * quizzes upsert
   */
  export type quizzesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quizzes
     */
    select?: quizzesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quizzes
     */
    omit?: quizzesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizzesInclude<ExtArgs> | null
    /**
     * The filter to search for the quizzes to update in case it exists.
     */
    where: quizzesWhereUniqueInput
    /**
     * In case the quizzes found by the `where` argument doesn't exist, create a new quizzes with this data.
     */
    create: XOR<quizzesCreateInput, quizzesUncheckedCreateInput>
    /**
     * In case the quizzes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<quizzesUpdateInput, quizzesUncheckedUpdateInput>
  }

  /**
   * quizzes delete
   */
  export type quizzesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quizzes
     */
    select?: quizzesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quizzes
     */
    omit?: quizzesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizzesInclude<ExtArgs> | null
    /**
     * Filter which quizzes to delete.
     */
    where: quizzesWhereUniqueInput
  }

  /**
   * quizzes deleteMany
   */
  export type quizzesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which quizzes to delete
     */
    where?: quizzesWhereInput
    /**
     * Limit how many quizzes to delete.
     */
    limit?: number
  }

  /**
   * quizzes.participant_history
   */
  export type quizzes$participant_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_history
     */
    select?: participant_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_history
     */
    omit?: participant_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_historyInclude<ExtArgs> | null
    where?: participant_historyWhereInput
    orderBy?: participant_historyOrderByWithRelationInput | participant_historyOrderByWithRelationInput[]
    cursor?: participant_historyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Participant_historyScalarFieldEnum | Participant_historyScalarFieldEnum[]
  }

  /**
   * quizzes.questions
   */
  export type quizzes$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the questions
     */
    select?: questionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the questions
     */
    omit?: questionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: questionsInclude<ExtArgs> | null
    where?: questionsWhereInput
    orderBy?: questionsOrderByWithRelationInput | questionsOrderByWithRelationInput[]
    cursor?: questionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionsScalarFieldEnum | QuestionsScalarFieldEnum[]
  }

  /**
   * quizzes.quiz_sessions
   */
  export type quizzes$quiz_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz_sessions
     */
    select?: quiz_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz_sessions
     */
    omit?: quiz_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quiz_sessionsInclude<ExtArgs> | null
    where?: quiz_sessionsWhereInput
    orderBy?: quiz_sessionsOrderByWithRelationInput | quiz_sessionsOrderByWithRelationInput[]
    cursor?: quiz_sessionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Quiz_sessionsScalarFieldEnum | Quiz_sessionsScalarFieldEnum[]
  }

  /**
   * quizzes.teams
   */
  export type quizzes$teamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    where?: teamsWhereInput
    orderBy?: teamsOrderByWithRelationInput | teamsOrderByWithRelationInput[]
    cursor?: teamsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamsScalarFieldEnum | TeamsScalarFieldEnum[]
  }

  /**
   * quizzes without action
   */
  export type quizzesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quizzes
     */
    select?: quizzesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quizzes
     */
    omit?: quizzesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizzesInclude<ExtArgs> | null
  }


  /**
   * Model session_participants
   */

  export type AggregateSession_participants = {
    _count: Session_participantsCountAggregateOutputType | null
    _avg: Session_participantsAvgAggregateOutputType | null
    _sum: Session_participantsSumAggregateOutputType | null
    _min: Session_participantsMinAggregateOutputType | null
    _max: Session_participantsMaxAggregateOutputType | null
  }

  export type Session_participantsAvgAggregateOutputType = {
    id: number | null
    session_id: number | null
    user_id: number | null
    score: number | null
    streak: number | null
    accuracy: number | null
  }

  export type Session_participantsSumAggregateOutputType = {
    id: number | null
    session_id: number | null
    user_id: number | null
    score: number | null
    streak: number | null
    accuracy: number | null
  }

  export type Session_participantsMinAggregateOutputType = {
    id: number | null
    session_id: number | null
    user_id: number | null
    join_code: string | null
    team: string | null
    score: number | null
    streak: number | null
    accuracy: number | null
    joined_at: Date | null
  }

  export type Session_participantsMaxAggregateOutputType = {
    id: number | null
    session_id: number | null
    user_id: number | null
    join_code: string | null
    team: string | null
    score: number | null
    streak: number | null
    accuracy: number | null
    joined_at: Date | null
  }

  export type Session_participantsCountAggregateOutputType = {
    id: number
    session_id: number
    user_id: number
    join_code: number
    team: number
    score: number
    streak: number
    accuracy: number
    joined_at: number
    _all: number
  }


  export type Session_participantsAvgAggregateInputType = {
    id?: true
    session_id?: true
    user_id?: true
    score?: true
    streak?: true
    accuracy?: true
  }

  export type Session_participantsSumAggregateInputType = {
    id?: true
    session_id?: true
    user_id?: true
    score?: true
    streak?: true
    accuracy?: true
  }

  export type Session_participantsMinAggregateInputType = {
    id?: true
    session_id?: true
    user_id?: true
    join_code?: true
    team?: true
    score?: true
    streak?: true
    accuracy?: true
    joined_at?: true
  }

  export type Session_participantsMaxAggregateInputType = {
    id?: true
    session_id?: true
    user_id?: true
    join_code?: true
    team?: true
    score?: true
    streak?: true
    accuracy?: true
    joined_at?: true
  }

  export type Session_participantsCountAggregateInputType = {
    id?: true
    session_id?: true
    user_id?: true
    join_code?: true
    team?: true
    score?: true
    streak?: true
    accuracy?: true
    joined_at?: true
    _all?: true
  }

  export type Session_participantsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which session_participants to aggregate.
     */
    where?: session_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of session_participants to fetch.
     */
    orderBy?: session_participantsOrderByWithRelationInput | session_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: session_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` session_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` session_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned session_participants
    **/
    _count?: true | Session_participantsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Session_participantsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Session_participantsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Session_participantsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Session_participantsMaxAggregateInputType
  }

  export type GetSession_participantsAggregateType<T extends Session_participantsAggregateArgs> = {
        [P in keyof T & keyof AggregateSession_participants]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession_participants[P]>
      : GetScalarType<T[P], AggregateSession_participants[P]>
  }




  export type session_participantsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: session_participantsWhereInput
    orderBy?: session_participantsOrderByWithAggregationInput | session_participantsOrderByWithAggregationInput[]
    by: Session_participantsScalarFieldEnum[] | Session_participantsScalarFieldEnum
    having?: session_participantsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Session_participantsCountAggregateInputType | true
    _avg?: Session_participantsAvgAggregateInputType
    _sum?: Session_participantsSumAggregateInputType
    _min?: Session_participantsMinAggregateInputType
    _max?: Session_participantsMaxAggregateInputType
  }

  export type Session_participantsGroupByOutputType = {
    id: number
    session_id: number
    user_id: number
    join_code: string | null
    team: string | null
    score: number | null
    streak: number | null
    accuracy: number | null
    joined_at: Date | null
    _count: Session_participantsCountAggregateOutputType | null
    _avg: Session_participantsAvgAggregateOutputType | null
    _sum: Session_participantsSumAggregateOutputType | null
    _min: Session_participantsMinAggregateOutputType | null
    _max: Session_participantsMaxAggregateOutputType | null
  }

  type GetSession_participantsGroupByPayload<T extends session_participantsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Session_participantsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Session_participantsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Session_participantsGroupByOutputType[P]>
            : GetScalarType<T[P], Session_participantsGroupByOutputType[P]>
        }
      >
    >


  export type session_participantsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    session_id?: boolean
    user_id?: boolean
    join_code?: boolean
    team?: boolean
    score?: boolean
    streak?: boolean
    accuracy?: boolean
    joined_at?: boolean
    answers?: boolean | session_participants$answersArgs<ExtArgs>
    quiz_sessions?: boolean | quiz_sessionsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | Session_participantsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session_participants"]>



  export type session_participantsSelectScalar = {
    id?: boolean
    session_id?: boolean
    user_id?: boolean
    join_code?: boolean
    team?: boolean
    score?: boolean
    streak?: boolean
    accuracy?: boolean
    joined_at?: boolean
  }

  export type session_participantsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "session_id" | "user_id" | "join_code" | "team" | "score" | "streak" | "accuracy" | "joined_at", ExtArgs["result"]["session_participants"]>
  export type session_participantsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | session_participants$answersArgs<ExtArgs>
    quiz_sessions?: boolean | quiz_sessionsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | Session_participantsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $session_participantsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "session_participants"
    objects: {
      answers: Prisma.$answersPayload<ExtArgs>[]
      quiz_sessions: Prisma.$quiz_sessionsPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      session_id: number
      user_id: number
      join_code: string | null
      team: string | null
      score: number | null
      streak: number | null
      accuracy: number | null
      joined_at: Date | null
    }, ExtArgs["result"]["session_participants"]>
    composites: {}
  }

  type session_participantsGetPayload<S extends boolean | null | undefined | session_participantsDefaultArgs> = $Result.GetResult<Prisma.$session_participantsPayload, S>

  type session_participantsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<session_participantsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Session_participantsCountAggregateInputType | true
    }

  export interface session_participantsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['session_participants'], meta: { name: 'session_participants' } }
    /**
     * Find zero or one Session_participants that matches the filter.
     * @param {session_participantsFindUniqueArgs} args - Arguments to find a Session_participants
     * @example
     * // Get one Session_participants
     * const session_participants = await prisma.session_participants.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends session_participantsFindUniqueArgs>(args: SelectSubset<T, session_participantsFindUniqueArgs<ExtArgs>>): Prisma__session_participantsClient<$Result.GetResult<Prisma.$session_participantsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session_participants that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {session_participantsFindUniqueOrThrowArgs} args - Arguments to find a Session_participants
     * @example
     * // Get one Session_participants
     * const session_participants = await prisma.session_participants.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends session_participantsFindUniqueOrThrowArgs>(args: SelectSubset<T, session_participantsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__session_participantsClient<$Result.GetResult<Prisma.$session_participantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session_participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_participantsFindFirstArgs} args - Arguments to find a Session_participants
     * @example
     * // Get one Session_participants
     * const session_participants = await prisma.session_participants.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends session_participantsFindFirstArgs>(args?: SelectSubset<T, session_participantsFindFirstArgs<ExtArgs>>): Prisma__session_participantsClient<$Result.GetResult<Prisma.$session_participantsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session_participants that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_participantsFindFirstOrThrowArgs} args - Arguments to find a Session_participants
     * @example
     * // Get one Session_participants
     * const session_participants = await prisma.session_participants.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends session_participantsFindFirstOrThrowArgs>(args?: SelectSubset<T, session_participantsFindFirstOrThrowArgs<ExtArgs>>): Prisma__session_participantsClient<$Result.GetResult<Prisma.$session_participantsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Session_participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_participantsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Session_participants
     * const session_participants = await prisma.session_participants.findMany()
     * 
     * // Get first 10 Session_participants
     * const session_participants = await prisma.session_participants.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const session_participantsWithIdOnly = await prisma.session_participants.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends session_participantsFindManyArgs>(args?: SelectSubset<T, session_participantsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$session_participantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session_participants.
     * @param {session_participantsCreateArgs} args - Arguments to create a Session_participants.
     * @example
     * // Create one Session_participants
     * const Session_participants = await prisma.session_participants.create({
     *   data: {
     *     // ... data to create a Session_participants
     *   }
     * })
     * 
     */
    create<T extends session_participantsCreateArgs>(args: SelectSubset<T, session_participantsCreateArgs<ExtArgs>>): Prisma__session_participantsClient<$Result.GetResult<Prisma.$session_participantsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Session_participants.
     * @param {session_participantsCreateManyArgs} args - Arguments to create many Session_participants.
     * @example
     * // Create many Session_participants
     * const session_participants = await prisma.session_participants.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends session_participantsCreateManyArgs>(args?: SelectSubset<T, session_participantsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session_participants.
     * @param {session_participantsDeleteArgs} args - Arguments to delete one Session_participants.
     * @example
     * // Delete one Session_participants
     * const Session_participants = await prisma.session_participants.delete({
     *   where: {
     *     // ... filter to delete one Session_participants
     *   }
     * })
     * 
     */
    delete<T extends session_participantsDeleteArgs>(args: SelectSubset<T, session_participantsDeleteArgs<ExtArgs>>): Prisma__session_participantsClient<$Result.GetResult<Prisma.$session_participantsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session_participants.
     * @param {session_participantsUpdateArgs} args - Arguments to update one Session_participants.
     * @example
     * // Update one Session_participants
     * const session_participants = await prisma.session_participants.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends session_participantsUpdateArgs>(args: SelectSubset<T, session_participantsUpdateArgs<ExtArgs>>): Prisma__session_participantsClient<$Result.GetResult<Prisma.$session_participantsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Session_participants.
     * @param {session_participantsDeleteManyArgs} args - Arguments to filter Session_participants to delete.
     * @example
     * // Delete a few Session_participants
     * const { count } = await prisma.session_participants.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends session_participantsDeleteManyArgs>(args?: SelectSubset<T, session_participantsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Session_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_participantsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Session_participants
     * const session_participants = await prisma.session_participants.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends session_participantsUpdateManyArgs>(args: SelectSubset<T, session_participantsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session_participants.
     * @param {session_participantsUpsertArgs} args - Arguments to update or create a Session_participants.
     * @example
     * // Update or create a Session_participants
     * const session_participants = await prisma.session_participants.upsert({
     *   create: {
     *     // ... data to create a Session_participants
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session_participants we want to update
     *   }
     * })
     */
    upsert<T extends session_participantsUpsertArgs>(args: SelectSubset<T, session_participantsUpsertArgs<ExtArgs>>): Prisma__session_participantsClient<$Result.GetResult<Prisma.$session_participantsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Session_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_participantsCountArgs} args - Arguments to filter Session_participants to count.
     * @example
     * // Count the number of Session_participants
     * const count = await prisma.session_participants.count({
     *   where: {
     *     // ... the filter for the Session_participants we want to count
     *   }
     * })
    **/
    count<T extends session_participantsCountArgs>(
      args?: Subset<T, session_participantsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Session_participantsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Session_participantsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Session_participantsAggregateArgs>(args: Subset<T, Session_participantsAggregateArgs>): Prisma.PrismaPromise<GetSession_participantsAggregateType<T>>

    /**
     * Group by Session_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_participantsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends session_participantsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: session_participantsGroupByArgs['orderBy'] }
        : { orderBy?: session_participantsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, session_participantsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSession_participantsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the session_participants model
   */
  readonly fields: session_participantsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for session_participants.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__session_participantsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    answers<T extends session_participants$answersArgs<ExtArgs> = {}>(args?: Subset<T, session_participants$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$answersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quiz_sessions<T extends quiz_sessionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, quiz_sessionsDefaultArgs<ExtArgs>>): Prisma__quiz_sessionsClient<$Result.GetResult<Prisma.$quiz_sessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the session_participants model
   */
  interface session_participantsFieldRefs {
    readonly id: FieldRef<"session_participants", 'Int'>
    readonly session_id: FieldRef<"session_participants", 'Int'>
    readonly user_id: FieldRef<"session_participants", 'Int'>
    readonly join_code: FieldRef<"session_participants", 'String'>
    readonly team: FieldRef<"session_participants", 'String'>
    readonly score: FieldRef<"session_participants", 'Int'>
    readonly streak: FieldRef<"session_participants", 'Int'>
    readonly accuracy: FieldRef<"session_participants", 'Float'>
    readonly joined_at: FieldRef<"session_participants", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * session_participants findUnique
   */
  export type session_participantsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session_participants
     */
    select?: session_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session_participants
     */
    omit?: session_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: session_participantsInclude<ExtArgs> | null
    /**
     * Filter, which session_participants to fetch.
     */
    where: session_participantsWhereUniqueInput
  }

  /**
   * session_participants findUniqueOrThrow
   */
  export type session_participantsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session_participants
     */
    select?: session_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session_participants
     */
    omit?: session_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: session_participantsInclude<ExtArgs> | null
    /**
     * Filter, which session_participants to fetch.
     */
    where: session_participantsWhereUniqueInput
  }

  /**
   * session_participants findFirst
   */
  export type session_participantsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session_participants
     */
    select?: session_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session_participants
     */
    omit?: session_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: session_participantsInclude<ExtArgs> | null
    /**
     * Filter, which session_participants to fetch.
     */
    where?: session_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of session_participants to fetch.
     */
    orderBy?: session_participantsOrderByWithRelationInput | session_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for session_participants.
     */
    cursor?: session_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` session_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` session_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of session_participants.
     */
    distinct?: Session_participantsScalarFieldEnum | Session_participantsScalarFieldEnum[]
  }

  /**
   * session_participants findFirstOrThrow
   */
  export type session_participantsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session_participants
     */
    select?: session_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session_participants
     */
    omit?: session_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: session_participantsInclude<ExtArgs> | null
    /**
     * Filter, which session_participants to fetch.
     */
    where?: session_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of session_participants to fetch.
     */
    orderBy?: session_participantsOrderByWithRelationInput | session_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for session_participants.
     */
    cursor?: session_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` session_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` session_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of session_participants.
     */
    distinct?: Session_participantsScalarFieldEnum | Session_participantsScalarFieldEnum[]
  }

  /**
   * session_participants findMany
   */
  export type session_participantsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session_participants
     */
    select?: session_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session_participants
     */
    omit?: session_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: session_participantsInclude<ExtArgs> | null
    /**
     * Filter, which session_participants to fetch.
     */
    where?: session_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of session_participants to fetch.
     */
    orderBy?: session_participantsOrderByWithRelationInput | session_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing session_participants.
     */
    cursor?: session_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` session_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` session_participants.
     */
    skip?: number
    distinct?: Session_participantsScalarFieldEnum | Session_participantsScalarFieldEnum[]
  }

  /**
   * session_participants create
   */
  export type session_participantsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session_participants
     */
    select?: session_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session_participants
     */
    omit?: session_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: session_participantsInclude<ExtArgs> | null
    /**
     * The data needed to create a session_participants.
     */
    data: XOR<session_participantsCreateInput, session_participantsUncheckedCreateInput>
  }

  /**
   * session_participants createMany
   */
  export type session_participantsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many session_participants.
     */
    data: session_participantsCreateManyInput | session_participantsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * session_participants update
   */
  export type session_participantsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session_participants
     */
    select?: session_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session_participants
     */
    omit?: session_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: session_participantsInclude<ExtArgs> | null
    /**
     * The data needed to update a session_participants.
     */
    data: XOR<session_participantsUpdateInput, session_participantsUncheckedUpdateInput>
    /**
     * Choose, which session_participants to update.
     */
    where: session_participantsWhereUniqueInput
  }

  /**
   * session_participants updateMany
   */
  export type session_participantsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update session_participants.
     */
    data: XOR<session_participantsUpdateManyMutationInput, session_participantsUncheckedUpdateManyInput>
    /**
     * Filter which session_participants to update
     */
    where?: session_participantsWhereInput
    /**
     * Limit how many session_participants to update.
     */
    limit?: number
  }

  /**
   * session_participants upsert
   */
  export type session_participantsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session_participants
     */
    select?: session_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session_participants
     */
    omit?: session_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: session_participantsInclude<ExtArgs> | null
    /**
     * The filter to search for the session_participants to update in case it exists.
     */
    where: session_participantsWhereUniqueInput
    /**
     * In case the session_participants found by the `where` argument doesn't exist, create a new session_participants with this data.
     */
    create: XOR<session_participantsCreateInput, session_participantsUncheckedCreateInput>
    /**
     * In case the session_participants was found with the provided `where` argument, update it with this data.
     */
    update: XOR<session_participantsUpdateInput, session_participantsUncheckedUpdateInput>
  }

  /**
   * session_participants delete
   */
  export type session_participantsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session_participants
     */
    select?: session_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session_participants
     */
    omit?: session_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: session_participantsInclude<ExtArgs> | null
    /**
     * Filter which session_participants to delete.
     */
    where: session_participantsWhereUniqueInput
  }

  /**
   * session_participants deleteMany
   */
  export type session_participantsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which session_participants to delete
     */
    where?: session_participantsWhereInput
    /**
     * Limit how many session_participants to delete.
     */
    limit?: number
  }

  /**
   * session_participants.answers
   */
  export type session_participants$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the answers
     */
    select?: answersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the answers
     */
    omit?: answersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: answersInclude<ExtArgs> | null
    where?: answersWhereInput
    orderBy?: answersOrderByWithRelationInput | answersOrderByWithRelationInput[]
    cursor?: answersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnswersScalarFieldEnum | AnswersScalarFieldEnum[]
  }

  /**
   * session_participants without action
   */
  export type session_participantsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session_participants
     */
    select?: session_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session_participants
     */
    omit?: session_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: session_participantsInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    email: string | null
    role: $Enums.users_role | null
    created_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    email: string | null
    role: $Enums.users_role | null
    created_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    username: number
    password: number
    email: number
    role: number
    created_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    email?: true
    role?: true
    created_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    email?: true
    role?: true
    created_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    email?: true
    role?: true
    created_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    username: string
    password: string
    email: string
    role: $Enums.users_role
    created_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    email?: boolean
    role?: boolean
    created_at?: boolean
    participant_history?: boolean | users$participant_historyArgs<ExtArgs>
    quiz_sessions?: boolean | users$quiz_sessionsArgs<ExtArgs>
    quizzes?: boolean | users$quizzesArgs<ExtArgs>
    session_participants?: boolean | users$session_participantsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>



  export type usersSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    email?: boolean
    role?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "email" | "role" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant_history?: boolean | users$participant_historyArgs<ExtArgs>
    quiz_sessions?: boolean | users$quiz_sessionsArgs<ExtArgs>
    quizzes?: boolean | users$quizzesArgs<ExtArgs>
    session_participants?: boolean | users$session_participantsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      participant_history: Prisma.$participant_historyPayload<ExtArgs>[]
      quiz_sessions: Prisma.$quiz_sessionsPayload<ExtArgs>[]
      quizzes: Prisma.$quizzesPayload<ExtArgs>[]
      session_participants: Prisma.$session_participantsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password: string
      email: string
      role: $Enums.users_role
      created_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participant_history<T extends users$participant_historyArgs<ExtArgs> = {}>(args?: Subset<T, users$participant_historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participant_historyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quiz_sessions<T extends users$quiz_sessionsArgs<ExtArgs> = {}>(args?: Subset<T, users$quiz_sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$quiz_sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quizzes<T extends users$quizzesArgs<ExtArgs> = {}>(args?: Subset<T, users$quizzesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$quizzesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    session_participants<T extends users$session_participantsArgs<ExtArgs> = {}>(args?: Subset<T, users$session_participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$session_participantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly username: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'users_role'>
    readonly created_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.participant_history
   */
  export type users$participant_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_history
     */
    select?: participant_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_history
     */
    omit?: participant_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_historyInclude<ExtArgs> | null
    where?: participant_historyWhereInput
    orderBy?: participant_historyOrderByWithRelationInput | participant_historyOrderByWithRelationInput[]
    cursor?: participant_historyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Participant_historyScalarFieldEnum | Participant_historyScalarFieldEnum[]
  }

  /**
   * users.quiz_sessions
   */
  export type users$quiz_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz_sessions
     */
    select?: quiz_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz_sessions
     */
    omit?: quiz_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quiz_sessionsInclude<ExtArgs> | null
    where?: quiz_sessionsWhereInput
    orderBy?: quiz_sessionsOrderByWithRelationInput | quiz_sessionsOrderByWithRelationInput[]
    cursor?: quiz_sessionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Quiz_sessionsScalarFieldEnum | Quiz_sessionsScalarFieldEnum[]
  }

  /**
   * users.quizzes
   */
  export type users$quizzesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quizzes
     */
    select?: quizzesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quizzes
     */
    omit?: quizzesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizzesInclude<ExtArgs> | null
    where?: quizzesWhereInput
    orderBy?: quizzesOrderByWithRelationInput | quizzesOrderByWithRelationInput[]
    cursor?: quizzesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizzesScalarFieldEnum | QuizzesScalarFieldEnum[]
  }

  /**
   * users.session_participants
   */
  export type users$session_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session_participants
     */
    select?: session_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session_participants
     */
    omit?: session_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: session_participantsInclude<ExtArgs> | null
    where?: session_participantsWhereInput
    orderBy?: session_participantsOrderByWithRelationInput | session_participantsOrderByWithRelationInput[]
    cursor?: session_participantsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Session_participantsScalarFieldEnum | Session_participantsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AnswersScalarFieldEnum: {
    id: 'id',
    session_participant_id: 'session_participant_id',
    question_id: 'question_id',
    selected_option: 'selected_option',
    is_correct: 'is_correct',
    time_taken: 'time_taken',
    points_awarded: 'points_awarded',
    streak_at_time: 'streak_at_time',
    answered_at: 'answered_at'
  };

  export type AnswersScalarFieldEnum = (typeof AnswersScalarFieldEnum)[keyof typeof AnswersScalarFieldEnum]


  export const OptionsScalarFieldEnum: {
    id: 'id',
    question_id: 'question_id',
    option_text: 'option_text',
    option_index: 'option_index'
  };

  export type OptionsScalarFieldEnum = (typeof OptionsScalarFieldEnum)[keyof typeof OptionsScalarFieldEnum]


  export const Matching_pairsScalarFieldEnum: {
    id: 'id',
    question_id: 'question_id',
    left_item: 'left_item',
    right_item: 'right_item',
    pair_index: 'pair_index'
  };

  export type Matching_pairsScalarFieldEnum = (typeof Matching_pairsScalarFieldEnum)[keyof typeof Matching_pairsScalarFieldEnum]


  export const Drag_drop_itemsScalarFieldEnum: {
    id: 'id',
    question_id: 'question_id',
    item_text: 'item_text',
    category: 'category',
    item_index: 'item_index'
  };

  export type Drag_drop_itemsScalarFieldEnum = (typeof Drag_drop_itemsScalarFieldEnum)[keyof typeof Drag_drop_itemsScalarFieldEnum]


  export const Ordering_itemsScalarFieldEnum: {
    id: 'id',
    question_id: 'question_id',
    item_text: 'item_text',
    correct_order: 'correct_order'
  };

  export type Ordering_itemsScalarFieldEnum = (typeof Ordering_itemsScalarFieldEnum)[keyof typeof Ordering_itemsScalarFieldEnum]


  export const TeamsScalarFieldEnum: {
    id: 'id',
    quiz_id: 'quiz_id',
    name: 'name',
    color: 'color',
    max_members: 'max_members',
    created_at: 'created_at'
  };

  export type TeamsScalarFieldEnum = (typeof TeamsScalarFieldEnum)[keyof typeof TeamsScalarFieldEnum]


  export const Participant_historyScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    quiz_id: 'quiz_id',
    total_sessions: 'total_sessions',
    total_score: 'total_score',
    total_correct: 'total_correct',
    total_questions: 'total_questions',
    best_streak: 'best_streak',
    last_played: 'last_played'
  };

  export type Participant_historyScalarFieldEnum = (typeof Participant_historyScalarFieldEnum)[keyof typeof Participant_historyScalarFieldEnum]


  export const QuestionsScalarFieldEnum: {
    id: 'id',
    quiz_id: 'quiz_id',
    type: 'type',
    question: 'question',
    correct_answer: 'correct_answer',
    time_limit: 'time_limit',
    points: 'points',
    category: 'category',
    media_type: 'media_type',
    media_url: 'media_url'
  };

  export type QuestionsScalarFieldEnum = (typeof QuestionsScalarFieldEnum)[keyof typeof QuestionsScalarFieldEnum]


  export const Quiz_sessionsScalarFieldEnum: {
    id: 'id',
    quiz_id: 'quiz_id',
    host_id: 'host_id',
    code: 'code',
    status: 'status',
    started_at: 'started_at',
    ended_at: 'ended_at'
  };

  export type Quiz_sessionsScalarFieldEnum = (typeof Quiz_sessionsScalarFieldEnum)[keyof typeof Quiz_sessionsScalarFieldEnum]


  export const QuizzesScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    title: 'title',
    description: 'description',
    negative_marking: 'negative_marking',
    team_mode: 'team_mode',
    status: 'status',
    created_at: 'created_at'
  };

  export type QuizzesScalarFieldEnum = (typeof QuizzesScalarFieldEnum)[keyof typeof QuizzesScalarFieldEnum]


  export const Session_participantsScalarFieldEnum: {
    id: 'id',
    session_id: 'session_id',
    user_id: 'user_id',
    join_code: 'join_code',
    team: 'team',
    score: 'score',
    streak: 'streak',
    accuracy: 'accuracy',
    joined_at: 'joined_at'
  };

  export type Session_participantsScalarFieldEnum = (typeof Session_participantsScalarFieldEnum)[keyof typeof Session_participantsScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    email: 'email',
    role: 'role',
    created_at: 'created_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const answersOrderByRelevanceFieldEnum: {
    selected_option: 'selected_option'
  };

  export type answersOrderByRelevanceFieldEnum = (typeof answersOrderByRelevanceFieldEnum)[keyof typeof answersOrderByRelevanceFieldEnum]


  export const optionsOrderByRelevanceFieldEnum: {
    option_text: 'option_text'
  };

  export type optionsOrderByRelevanceFieldEnum = (typeof optionsOrderByRelevanceFieldEnum)[keyof typeof optionsOrderByRelevanceFieldEnum]


  export const matching_pairsOrderByRelevanceFieldEnum: {
    left_item: 'left_item',
    right_item: 'right_item'
  };

  export type matching_pairsOrderByRelevanceFieldEnum = (typeof matching_pairsOrderByRelevanceFieldEnum)[keyof typeof matching_pairsOrderByRelevanceFieldEnum]


  export const drag_drop_itemsOrderByRelevanceFieldEnum: {
    item_text: 'item_text',
    category: 'category'
  };

  export type drag_drop_itemsOrderByRelevanceFieldEnum = (typeof drag_drop_itemsOrderByRelevanceFieldEnum)[keyof typeof drag_drop_itemsOrderByRelevanceFieldEnum]


  export const ordering_itemsOrderByRelevanceFieldEnum: {
    item_text: 'item_text'
  };

  export type ordering_itemsOrderByRelevanceFieldEnum = (typeof ordering_itemsOrderByRelevanceFieldEnum)[keyof typeof ordering_itemsOrderByRelevanceFieldEnum]


  export const teamsOrderByRelevanceFieldEnum: {
    name: 'name',
    color: 'color'
  };

  export type teamsOrderByRelevanceFieldEnum = (typeof teamsOrderByRelevanceFieldEnum)[keyof typeof teamsOrderByRelevanceFieldEnum]


  export const questionsOrderByRelevanceFieldEnum: {
    question: 'question',
    correct_answer: 'correct_answer',
    category: 'category',
    media_url: 'media_url'
  };

  export type questionsOrderByRelevanceFieldEnum = (typeof questionsOrderByRelevanceFieldEnum)[keyof typeof questionsOrderByRelevanceFieldEnum]


  export const quiz_sessionsOrderByRelevanceFieldEnum: {
    code: 'code'
  };

  export type quiz_sessionsOrderByRelevanceFieldEnum = (typeof quiz_sessionsOrderByRelevanceFieldEnum)[keyof typeof quiz_sessionsOrderByRelevanceFieldEnum]


  export const quizzesOrderByRelevanceFieldEnum: {
    title: 'title',
    description: 'description'
  };

  export type quizzesOrderByRelevanceFieldEnum = (typeof quizzesOrderByRelevanceFieldEnum)[keyof typeof quizzesOrderByRelevanceFieldEnum]


  export const session_participantsOrderByRelevanceFieldEnum: {
    join_code: 'join_code',
    team: 'team'
  };

  export type session_participantsOrderByRelevanceFieldEnum = (typeof session_participantsOrderByRelevanceFieldEnum)[keyof typeof session_participantsOrderByRelevanceFieldEnum]


  export const usersOrderByRelevanceFieldEnum: {
    username: 'username',
    password: 'password',
    email: 'email'
  };

  export type usersOrderByRelevanceFieldEnum = (typeof usersOrderByRelevanceFieldEnum)[keyof typeof usersOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'questions_type'
   */
  export type Enumquestions_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'questions_type'>
    


  /**
   * Reference to a field of type 'questions_media_type'
   */
  export type Enumquestions_media_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'questions_media_type'>
    


  /**
   * Reference to a field of type 'quiz_sessions_status'
   */
  export type Enumquiz_sessions_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'quiz_sessions_status'>
    


  /**
   * Reference to a field of type 'quizzes_status'
   */
  export type Enumquizzes_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'quizzes_status'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'users_role'
   */
  export type Enumusers_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'users_role'>
    
  /**
   * Deep Input Types
   */


  export type answersWhereInput = {
    AND?: answersWhereInput | answersWhereInput[]
    OR?: answersWhereInput[]
    NOT?: answersWhereInput | answersWhereInput[]
    id?: IntFilter<"answers"> | number
    session_participant_id?: IntFilter<"answers"> | number
    question_id?: IntFilter<"answers"> | number
    selected_option?: StringNullableFilter<"answers"> | string | null
    is_correct?: BoolNullableFilter<"answers"> | boolean | null
    time_taken?: IntNullableFilter<"answers"> | number | null
    points_awarded?: IntNullableFilter<"answers"> | number | null
    streak_at_time?: IntNullableFilter<"answers"> | number | null
    answered_at?: DateTimeNullableFilter<"answers"> | Date | string | null
    session_participants?: XOR<Session_participantsScalarRelationFilter, session_participantsWhereInput>
    questions?: XOR<QuestionsScalarRelationFilter, questionsWhereInput>
  }

  export type answersOrderByWithRelationInput = {
    id?: SortOrder
    session_participant_id?: SortOrder
    question_id?: SortOrder
    selected_option?: SortOrderInput | SortOrder
    is_correct?: SortOrderInput | SortOrder
    time_taken?: SortOrderInput | SortOrder
    points_awarded?: SortOrderInput | SortOrder
    streak_at_time?: SortOrderInput | SortOrder
    answered_at?: SortOrderInput | SortOrder
    session_participants?: session_participantsOrderByWithRelationInput
    questions?: questionsOrderByWithRelationInput
    _relevance?: answersOrderByRelevanceInput
  }

  export type answersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: answersWhereInput | answersWhereInput[]
    OR?: answersWhereInput[]
    NOT?: answersWhereInput | answersWhereInput[]
    session_participant_id?: IntFilter<"answers"> | number
    question_id?: IntFilter<"answers"> | number
    selected_option?: StringNullableFilter<"answers"> | string | null
    is_correct?: BoolNullableFilter<"answers"> | boolean | null
    time_taken?: IntNullableFilter<"answers"> | number | null
    points_awarded?: IntNullableFilter<"answers"> | number | null
    streak_at_time?: IntNullableFilter<"answers"> | number | null
    answered_at?: DateTimeNullableFilter<"answers"> | Date | string | null
    session_participants?: XOR<Session_participantsScalarRelationFilter, session_participantsWhereInput>
    questions?: XOR<QuestionsScalarRelationFilter, questionsWhereInput>
  }, "id">

  export type answersOrderByWithAggregationInput = {
    id?: SortOrder
    session_participant_id?: SortOrder
    question_id?: SortOrder
    selected_option?: SortOrderInput | SortOrder
    is_correct?: SortOrderInput | SortOrder
    time_taken?: SortOrderInput | SortOrder
    points_awarded?: SortOrderInput | SortOrder
    streak_at_time?: SortOrderInput | SortOrder
    answered_at?: SortOrderInput | SortOrder
    _count?: answersCountOrderByAggregateInput
    _avg?: answersAvgOrderByAggregateInput
    _max?: answersMaxOrderByAggregateInput
    _min?: answersMinOrderByAggregateInput
    _sum?: answersSumOrderByAggregateInput
  }

  export type answersScalarWhereWithAggregatesInput = {
    AND?: answersScalarWhereWithAggregatesInput | answersScalarWhereWithAggregatesInput[]
    OR?: answersScalarWhereWithAggregatesInput[]
    NOT?: answersScalarWhereWithAggregatesInput | answersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"answers"> | number
    session_participant_id?: IntWithAggregatesFilter<"answers"> | number
    question_id?: IntWithAggregatesFilter<"answers"> | number
    selected_option?: StringNullableWithAggregatesFilter<"answers"> | string | null
    is_correct?: BoolNullableWithAggregatesFilter<"answers"> | boolean | null
    time_taken?: IntNullableWithAggregatesFilter<"answers"> | number | null
    points_awarded?: IntNullableWithAggregatesFilter<"answers"> | number | null
    streak_at_time?: IntNullableWithAggregatesFilter<"answers"> | number | null
    answered_at?: DateTimeNullableWithAggregatesFilter<"answers"> | Date | string | null
  }

  export type optionsWhereInput = {
    AND?: optionsWhereInput | optionsWhereInput[]
    OR?: optionsWhereInput[]
    NOT?: optionsWhereInput | optionsWhereInput[]
    id?: IntFilter<"options"> | number
    question_id?: IntFilter<"options"> | number
    option_text?: StringFilter<"options"> | string
    option_index?: IntFilter<"options"> | number
    questions?: XOR<QuestionsScalarRelationFilter, questionsWhereInput>
  }

  export type optionsOrderByWithRelationInput = {
    id?: SortOrder
    question_id?: SortOrder
    option_text?: SortOrder
    option_index?: SortOrder
    questions?: questionsOrderByWithRelationInput
    _relevance?: optionsOrderByRelevanceInput
  }

  export type optionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: optionsWhereInput | optionsWhereInput[]
    OR?: optionsWhereInput[]
    NOT?: optionsWhereInput | optionsWhereInput[]
    question_id?: IntFilter<"options"> | number
    option_text?: StringFilter<"options"> | string
    option_index?: IntFilter<"options"> | number
    questions?: XOR<QuestionsScalarRelationFilter, questionsWhereInput>
  }, "id">

  export type optionsOrderByWithAggregationInput = {
    id?: SortOrder
    question_id?: SortOrder
    option_text?: SortOrder
    option_index?: SortOrder
    _count?: optionsCountOrderByAggregateInput
    _avg?: optionsAvgOrderByAggregateInput
    _max?: optionsMaxOrderByAggregateInput
    _min?: optionsMinOrderByAggregateInput
    _sum?: optionsSumOrderByAggregateInput
  }

  export type optionsScalarWhereWithAggregatesInput = {
    AND?: optionsScalarWhereWithAggregatesInput | optionsScalarWhereWithAggregatesInput[]
    OR?: optionsScalarWhereWithAggregatesInput[]
    NOT?: optionsScalarWhereWithAggregatesInput | optionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"options"> | number
    question_id?: IntWithAggregatesFilter<"options"> | number
    option_text?: StringWithAggregatesFilter<"options"> | string
    option_index?: IntWithAggregatesFilter<"options"> | number
  }

  export type matching_pairsWhereInput = {
    AND?: matching_pairsWhereInput | matching_pairsWhereInput[]
    OR?: matching_pairsWhereInput[]
    NOT?: matching_pairsWhereInput | matching_pairsWhereInput[]
    id?: IntFilter<"matching_pairs"> | number
    question_id?: IntFilter<"matching_pairs"> | number
    left_item?: StringFilter<"matching_pairs"> | string
    right_item?: StringFilter<"matching_pairs"> | string
    pair_index?: IntFilter<"matching_pairs"> | number
    questions?: XOR<QuestionsScalarRelationFilter, questionsWhereInput>
  }

  export type matching_pairsOrderByWithRelationInput = {
    id?: SortOrder
    question_id?: SortOrder
    left_item?: SortOrder
    right_item?: SortOrder
    pair_index?: SortOrder
    questions?: questionsOrderByWithRelationInput
    _relevance?: matching_pairsOrderByRelevanceInput
  }

  export type matching_pairsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: matching_pairsWhereInput | matching_pairsWhereInput[]
    OR?: matching_pairsWhereInput[]
    NOT?: matching_pairsWhereInput | matching_pairsWhereInput[]
    question_id?: IntFilter<"matching_pairs"> | number
    left_item?: StringFilter<"matching_pairs"> | string
    right_item?: StringFilter<"matching_pairs"> | string
    pair_index?: IntFilter<"matching_pairs"> | number
    questions?: XOR<QuestionsScalarRelationFilter, questionsWhereInput>
  }, "id">

  export type matching_pairsOrderByWithAggregationInput = {
    id?: SortOrder
    question_id?: SortOrder
    left_item?: SortOrder
    right_item?: SortOrder
    pair_index?: SortOrder
    _count?: matching_pairsCountOrderByAggregateInput
    _avg?: matching_pairsAvgOrderByAggregateInput
    _max?: matching_pairsMaxOrderByAggregateInput
    _min?: matching_pairsMinOrderByAggregateInput
    _sum?: matching_pairsSumOrderByAggregateInput
  }

  export type matching_pairsScalarWhereWithAggregatesInput = {
    AND?: matching_pairsScalarWhereWithAggregatesInput | matching_pairsScalarWhereWithAggregatesInput[]
    OR?: matching_pairsScalarWhereWithAggregatesInput[]
    NOT?: matching_pairsScalarWhereWithAggregatesInput | matching_pairsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"matching_pairs"> | number
    question_id?: IntWithAggregatesFilter<"matching_pairs"> | number
    left_item?: StringWithAggregatesFilter<"matching_pairs"> | string
    right_item?: StringWithAggregatesFilter<"matching_pairs"> | string
    pair_index?: IntWithAggregatesFilter<"matching_pairs"> | number
  }

  export type drag_drop_itemsWhereInput = {
    AND?: drag_drop_itemsWhereInput | drag_drop_itemsWhereInput[]
    OR?: drag_drop_itemsWhereInput[]
    NOT?: drag_drop_itemsWhereInput | drag_drop_itemsWhereInput[]
    id?: IntFilter<"drag_drop_items"> | number
    question_id?: IntFilter<"drag_drop_items"> | number
    item_text?: StringFilter<"drag_drop_items"> | string
    category?: StringFilter<"drag_drop_items"> | string
    item_index?: IntFilter<"drag_drop_items"> | number
    questions?: XOR<QuestionsScalarRelationFilter, questionsWhereInput>
  }

  export type drag_drop_itemsOrderByWithRelationInput = {
    id?: SortOrder
    question_id?: SortOrder
    item_text?: SortOrder
    category?: SortOrder
    item_index?: SortOrder
    questions?: questionsOrderByWithRelationInput
    _relevance?: drag_drop_itemsOrderByRelevanceInput
  }

  export type drag_drop_itemsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: drag_drop_itemsWhereInput | drag_drop_itemsWhereInput[]
    OR?: drag_drop_itemsWhereInput[]
    NOT?: drag_drop_itemsWhereInput | drag_drop_itemsWhereInput[]
    question_id?: IntFilter<"drag_drop_items"> | number
    item_text?: StringFilter<"drag_drop_items"> | string
    category?: StringFilter<"drag_drop_items"> | string
    item_index?: IntFilter<"drag_drop_items"> | number
    questions?: XOR<QuestionsScalarRelationFilter, questionsWhereInput>
  }, "id">

  export type drag_drop_itemsOrderByWithAggregationInput = {
    id?: SortOrder
    question_id?: SortOrder
    item_text?: SortOrder
    category?: SortOrder
    item_index?: SortOrder
    _count?: drag_drop_itemsCountOrderByAggregateInput
    _avg?: drag_drop_itemsAvgOrderByAggregateInput
    _max?: drag_drop_itemsMaxOrderByAggregateInput
    _min?: drag_drop_itemsMinOrderByAggregateInput
    _sum?: drag_drop_itemsSumOrderByAggregateInput
  }

  export type drag_drop_itemsScalarWhereWithAggregatesInput = {
    AND?: drag_drop_itemsScalarWhereWithAggregatesInput | drag_drop_itemsScalarWhereWithAggregatesInput[]
    OR?: drag_drop_itemsScalarWhereWithAggregatesInput[]
    NOT?: drag_drop_itemsScalarWhereWithAggregatesInput | drag_drop_itemsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"drag_drop_items"> | number
    question_id?: IntWithAggregatesFilter<"drag_drop_items"> | number
    item_text?: StringWithAggregatesFilter<"drag_drop_items"> | string
    category?: StringWithAggregatesFilter<"drag_drop_items"> | string
    item_index?: IntWithAggregatesFilter<"drag_drop_items"> | number
  }

  export type ordering_itemsWhereInput = {
    AND?: ordering_itemsWhereInput | ordering_itemsWhereInput[]
    OR?: ordering_itemsWhereInput[]
    NOT?: ordering_itemsWhereInput | ordering_itemsWhereInput[]
    id?: IntFilter<"ordering_items"> | number
    question_id?: IntFilter<"ordering_items"> | number
    item_text?: StringFilter<"ordering_items"> | string
    correct_order?: IntFilter<"ordering_items"> | number
    questions?: XOR<QuestionsScalarRelationFilter, questionsWhereInput>
  }

  export type ordering_itemsOrderByWithRelationInput = {
    id?: SortOrder
    question_id?: SortOrder
    item_text?: SortOrder
    correct_order?: SortOrder
    questions?: questionsOrderByWithRelationInput
    _relevance?: ordering_itemsOrderByRelevanceInput
  }

  export type ordering_itemsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ordering_itemsWhereInput | ordering_itemsWhereInput[]
    OR?: ordering_itemsWhereInput[]
    NOT?: ordering_itemsWhereInput | ordering_itemsWhereInput[]
    question_id?: IntFilter<"ordering_items"> | number
    item_text?: StringFilter<"ordering_items"> | string
    correct_order?: IntFilter<"ordering_items"> | number
    questions?: XOR<QuestionsScalarRelationFilter, questionsWhereInput>
  }, "id">

  export type ordering_itemsOrderByWithAggregationInput = {
    id?: SortOrder
    question_id?: SortOrder
    item_text?: SortOrder
    correct_order?: SortOrder
    _count?: ordering_itemsCountOrderByAggregateInput
    _avg?: ordering_itemsAvgOrderByAggregateInput
    _max?: ordering_itemsMaxOrderByAggregateInput
    _min?: ordering_itemsMinOrderByAggregateInput
    _sum?: ordering_itemsSumOrderByAggregateInput
  }

  export type ordering_itemsScalarWhereWithAggregatesInput = {
    AND?: ordering_itemsScalarWhereWithAggregatesInput | ordering_itemsScalarWhereWithAggregatesInput[]
    OR?: ordering_itemsScalarWhereWithAggregatesInput[]
    NOT?: ordering_itemsScalarWhereWithAggregatesInput | ordering_itemsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ordering_items"> | number
    question_id?: IntWithAggregatesFilter<"ordering_items"> | number
    item_text?: StringWithAggregatesFilter<"ordering_items"> | string
    correct_order?: IntWithAggregatesFilter<"ordering_items"> | number
  }

  export type teamsWhereInput = {
    AND?: teamsWhereInput | teamsWhereInput[]
    OR?: teamsWhereInput[]
    NOT?: teamsWhereInput | teamsWhereInput[]
    id?: IntFilter<"teams"> | number
    quiz_id?: IntFilter<"teams"> | number
    name?: StringFilter<"teams"> | string
    color?: StringFilter<"teams"> | string
    max_members?: IntFilter<"teams"> | number
    created_at?: DateTimeNullableFilter<"teams"> | Date | string | null
    quizzes?: XOR<QuizzesScalarRelationFilter, quizzesWhereInput>
  }

  export type teamsOrderByWithRelationInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    max_members?: SortOrder
    created_at?: SortOrderInput | SortOrder
    quizzes?: quizzesOrderByWithRelationInput
    _relevance?: teamsOrderByRelevanceInput
  }

  export type teamsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: teamsWhereInput | teamsWhereInput[]
    OR?: teamsWhereInput[]
    NOT?: teamsWhereInput | teamsWhereInput[]
    quiz_id?: IntFilter<"teams"> | number
    name?: StringFilter<"teams"> | string
    color?: StringFilter<"teams"> | string
    max_members?: IntFilter<"teams"> | number
    created_at?: DateTimeNullableFilter<"teams"> | Date | string | null
    quizzes?: XOR<QuizzesScalarRelationFilter, quizzesWhereInput>
  }, "id">

  export type teamsOrderByWithAggregationInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    max_members?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: teamsCountOrderByAggregateInput
    _avg?: teamsAvgOrderByAggregateInput
    _max?: teamsMaxOrderByAggregateInput
    _min?: teamsMinOrderByAggregateInput
    _sum?: teamsSumOrderByAggregateInput
  }

  export type teamsScalarWhereWithAggregatesInput = {
    AND?: teamsScalarWhereWithAggregatesInput | teamsScalarWhereWithAggregatesInput[]
    OR?: teamsScalarWhereWithAggregatesInput[]
    NOT?: teamsScalarWhereWithAggregatesInput | teamsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"teams"> | number
    quiz_id?: IntWithAggregatesFilter<"teams"> | number
    name?: StringWithAggregatesFilter<"teams"> | string
    color?: StringWithAggregatesFilter<"teams"> | string
    max_members?: IntWithAggregatesFilter<"teams"> | number
    created_at?: DateTimeNullableWithAggregatesFilter<"teams"> | Date | string | null
  }

  export type participant_historyWhereInput = {
    AND?: participant_historyWhereInput | participant_historyWhereInput[]
    OR?: participant_historyWhereInput[]
    NOT?: participant_historyWhereInput | participant_historyWhereInput[]
    id?: IntFilter<"participant_history"> | number
    user_id?: IntFilter<"participant_history"> | number
    quiz_id?: IntFilter<"participant_history"> | number
    total_sessions?: IntNullableFilter<"participant_history"> | number | null
    total_score?: IntNullableFilter<"participant_history"> | number | null
    total_correct?: IntNullableFilter<"participant_history"> | number | null
    total_questions?: IntNullableFilter<"participant_history"> | number | null
    best_streak?: IntNullableFilter<"participant_history"> | number | null
    last_played?: DateTimeNullableFilter<"participant_history"> | Date | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    quizzes?: XOR<QuizzesScalarRelationFilter, quizzesWhereInput>
  }

  export type participant_historyOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_id?: SortOrder
    total_sessions?: SortOrderInput | SortOrder
    total_score?: SortOrderInput | SortOrder
    total_correct?: SortOrderInput | SortOrder
    total_questions?: SortOrderInput | SortOrder
    best_streak?: SortOrderInput | SortOrder
    last_played?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
    quizzes?: quizzesOrderByWithRelationInput
  }

  export type participant_historyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: participant_historyWhereInput | participant_historyWhereInput[]
    OR?: participant_historyWhereInput[]
    NOT?: participant_historyWhereInput | participant_historyWhereInput[]
    user_id?: IntFilter<"participant_history"> | number
    quiz_id?: IntFilter<"participant_history"> | number
    total_sessions?: IntNullableFilter<"participant_history"> | number | null
    total_score?: IntNullableFilter<"participant_history"> | number | null
    total_correct?: IntNullableFilter<"participant_history"> | number | null
    total_questions?: IntNullableFilter<"participant_history"> | number | null
    best_streak?: IntNullableFilter<"participant_history"> | number | null
    last_played?: DateTimeNullableFilter<"participant_history"> | Date | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    quizzes?: XOR<QuizzesScalarRelationFilter, quizzesWhereInput>
  }, "id">

  export type participant_historyOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_id?: SortOrder
    total_sessions?: SortOrderInput | SortOrder
    total_score?: SortOrderInput | SortOrder
    total_correct?: SortOrderInput | SortOrder
    total_questions?: SortOrderInput | SortOrder
    best_streak?: SortOrderInput | SortOrder
    last_played?: SortOrderInput | SortOrder
    _count?: participant_historyCountOrderByAggregateInput
    _avg?: participant_historyAvgOrderByAggregateInput
    _max?: participant_historyMaxOrderByAggregateInput
    _min?: participant_historyMinOrderByAggregateInput
    _sum?: participant_historySumOrderByAggregateInput
  }

  export type participant_historyScalarWhereWithAggregatesInput = {
    AND?: participant_historyScalarWhereWithAggregatesInput | participant_historyScalarWhereWithAggregatesInput[]
    OR?: participant_historyScalarWhereWithAggregatesInput[]
    NOT?: participant_historyScalarWhereWithAggregatesInput | participant_historyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"participant_history"> | number
    user_id?: IntWithAggregatesFilter<"participant_history"> | number
    quiz_id?: IntWithAggregatesFilter<"participant_history"> | number
    total_sessions?: IntNullableWithAggregatesFilter<"participant_history"> | number | null
    total_score?: IntNullableWithAggregatesFilter<"participant_history"> | number | null
    total_correct?: IntNullableWithAggregatesFilter<"participant_history"> | number | null
    total_questions?: IntNullableWithAggregatesFilter<"participant_history"> | number | null
    best_streak?: IntNullableWithAggregatesFilter<"participant_history"> | number | null
    last_played?: DateTimeNullableWithAggregatesFilter<"participant_history"> | Date | string | null
  }

  export type questionsWhereInput = {
    AND?: questionsWhereInput | questionsWhereInput[]
    OR?: questionsWhereInput[]
    NOT?: questionsWhereInput | questionsWhereInput[]
    id?: IntFilter<"questions"> | number
    quiz_id?: IntFilter<"questions"> | number
    type?: Enumquestions_typeFilter<"questions"> | $Enums.questions_type
    question?: StringFilter<"questions"> | string
    correct_answer?: StringNullableFilter<"questions"> | string | null
    time_limit?: IntNullableFilter<"questions"> | number | null
    points?: IntNullableFilter<"questions"> | number | null
    category?: StringNullableFilter<"questions"> | string | null
    media_type?: Enumquestions_media_typeNullableFilter<"questions"> | $Enums.questions_media_type | null
    media_url?: StringNullableFilter<"questions"> | string | null
    answers?: AnswersListRelationFilter
    options?: OptionsListRelationFilter
    matching_pairs?: Matching_pairsListRelationFilter
    drag_drop_items?: Drag_drop_itemsListRelationFilter
    ordering_items?: Ordering_itemsListRelationFilter
    quizzes?: XOR<QuizzesScalarRelationFilter, quizzesWhereInput>
  }

  export type questionsOrderByWithRelationInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    type?: SortOrder
    question?: SortOrder
    correct_answer?: SortOrderInput | SortOrder
    time_limit?: SortOrderInput | SortOrder
    points?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    media_type?: SortOrderInput | SortOrder
    media_url?: SortOrderInput | SortOrder
    answers?: answersOrderByRelationAggregateInput
    options?: optionsOrderByRelationAggregateInput
    matching_pairs?: matching_pairsOrderByRelationAggregateInput
    drag_drop_items?: drag_drop_itemsOrderByRelationAggregateInput
    ordering_items?: ordering_itemsOrderByRelationAggregateInput
    quizzes?: quizzesOrderByWithRelationInput
    _relevance?: questionsOrderByRelevanceInput
  }

  export type questionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: questionsWhereInput | questionsWhereInput[]
    OR?: questionsWhereInput[]
    NOT?: questionsWhereInput | questionsWhereInput[]
    quiz_id?: IntFilter<"questions"> | number
    type?: Enumquestions_typeFilter<"questions"> | $Enums.questions_type
    question?: StringFilter<"questions"> | string
    correct_answer?: StringNullableFilter<"questions"> | string | null
    time_limit?: IntNullableFilter<"questions"> | number | null
    points?: IntNullableFilter<"questions"> | number | null
    category?: StringNullableFilter<"questions"> | string | null
    media_type?: Enumquestions_media_typeNullableFilter<"questions"> | $Enums.questions_media_type | null
    media_url?: StringNullableFilter<"questions"> | string | null
    answers?: AnswersListRelationFilter
    options?: OptionsListRelationFilter
    matching_pairs?: Matching_pairsListRelationFilter
    drag_drop_items?: Drag_drop_itemsListRelationFilter
    ordering_items?: Ordering_itemsListRelationFilter
    quizzes?: XOR<QuizzesScalarRelationFilter, quizzesWhereInput>
  }, "id">

  export type questionsOrderByWithAggregationInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    type?: SortOrder
    question?: SortOrder
    correct_answer?: SortOrderInput | SortOrder
    time_limit?: SortOrderInput | SortOrder
    points?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    media_type?: SortOrderInput | SortOrder
    media_url?: SortOrderInput | SortOrder
    _count?: questionsCountOrderByAggregateInput
    _avg?: questionsAvgOrderByAggregateInput
    _max?: questionsMaxOrderByAggregateInput
    _min?: questionsMinOrderByAggregateInput
    _sum?: questionsSumOrderByAggregateInput
  }

  export type questionsScalarWhereWithAggregatesInput = {
    AND?: questionsScalarWhereWithAggregatesInput | questionsScalarWhereWithAggregatesInput[]
    OR?: questionsScalarWhereWithAggregatesInput[]
    NOT?: questionsScalarWhereWithAggregatesInput | questionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"questions"> | number
    quiz_id?: IntWithAggregatesFilter<"questions"> | number
    type?: Enumquestions_typeWithAggregatesFilter<"questions"> | $Enums.questions_type
    question?: StringWithAggregatesFilter<"questions"> | string
    correct_answer?: StringNullableWithAggregatesFilter<"questions"> | string | null
    time_limit?: IntNullableWithAggregatesFilter<"questions"> | number | null
    points?: IntNullableWithAggregatesFilter<"questions"> | number | null
    category?: StringNullableWithAggregatesFilter<"questions"> | string | null
    media_type?: Enumquestions_media_typeNullableWithAggregatesFilter<"questions"> | $Enums.questions_media_type | null
    media_url?: StringNullableWithAggregatesFilter<"questions"> | string | null
  }

  export type quiz_sessionsWhereInput = {
    AND?: quiz_sessionsWhereInput | quiz_sessionsWhereInput[]
    OR?: quiz_sessionsWhereInput[]
    NOT?: quiz_sessionsWhereInput | quiz_sessionsWhereInput[]
    id?: IntFilter<"quiz_sessions"> | number
    quiz_id?: IntFilter<"quiz_sessions"> | number
    host_id?: IntFilter<"quiz_sessions"> | number
    code?: StringFilter<"quiz_sessions"> | string
    status?: Enumquiz_sessions_statusNullableFilter<"quiz_sessions"> | $Enums.quiz_sessions_status | null
    started_at?: DateTimeNullableFilter<"quiz_sessions"> | Date | string | null
    ended_at?: DateTimeNullableFilter<"quiz_sessions"> | Date | string | null
    quizzes?: XOR<QuizzesScalarRelationFilter, quizzesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    session_participants?: Session_participantsListRelationFilter
  }

  export type quiz_sessionsOrderByWithRelationInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    host_id?: SortOrder
    code?: SortOrder
    status?: SortOrderInput | SortOrder
    started_at?: SortOrderInput | SortOrder
    ended_at?: SortOrderInput | SortOrder
    quizzes?: quizzesOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    session_participants?: session_participantsOrderByRelationAggregateInput
    _relevance?: quiz_sessionsOrderByRelevanceInput
  }

  export type quiz_sessionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: quiz_sessionsWhereInput | quiz_sessionsWhereInput[]
    OR?: quiz_sessionsWhereInput[]
    NOT?: quiz_sessionsWhereInput | quiz_sessionsWhereInput[]
    quiz_id?: IntFilter<"quiz_sessions"> | number
    host_id?: IntFilter<"quiz_sessions"> | number
    status?: Enumquiz_sessions_statusNullableFilter<"quiz_sessions"> | $Enums.quiz_sessions_status | null
    started_at?: DateTimeNullableFilter<"quiz_sessions"> | Date | string | null
    ended_at?: DateTimeNullableFilter<"quiz_sessions"> | Date | string | null
    quizzes?: XOR<QuizzesScalarRelationFilter, quizzesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    session_participants?: Session_participantsListRelationFilter
  }, "id" | "code">

  export type quiz_sessionsOrderByWithAggregationInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    host_id?: SortOrder
    code?: SortOrder
    status?: SortOrderInput | SortOrder
    started_at?: SortOrderInput | SortOrder
    ended_at?: SortOrderInput | SortOrder
    _count?: quiz_sessionsCountOrderByAggregateInput
    _avg?: quiz_sessionsAvgOrderByAggregateInput
    _max?: quiz_sessionsMaxOrderByAggregateInput
    _min?: quiz_sessionsMinOrderByAggregateInput
    _sum?: quiz_sessionsSumOrderByAggregateInput
  }

  export type quiz_sessionsScalarWhereWithAggregatesInput = {
    AND?: quiz_sessionsScalarWhereWithAggregatesInput | quiz_sessionsScalarWhereWithAggregatesInput[]
    OR?: quiz_sessionsScalarWhereWithAggregatesInput[]
    NOT?: quiz_sessionsScalarWhereWithAggregatesInput | quiz_sessionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"quiz_sessions"> | number
    quiz_id?: IntWithAggregatesFilter<"quiz_sessions"> | number
    host_id?: IntWithAggregatesFilter<"quiz_sessions"> | number
    code?: StringWithAggregatesFilter<"quiz_sessions"> | string
    status?: Enumquiz_sessions_statusNullableWithAggregatesFilter<"quiz_sessions"> | $Enums.quiz_sessions_status | null
    started_at?: DateTimeNullableWithAggregatesFilter<"quiz_sessions"> | Date | string | null
    ended_at?: DateTimeNullableWithAggregatesFilter<"quiz_sessions"> | Date | string | null
  }

  export type quizzesWhereInput = {
    AND?: quizzesWhereInput | quizzesWhereInput[]
    OR?: quizzesWhereInput[]
    NOT?: quizzesWhereInput | quizzesWhereInput[]
    id?: IntFilter<"quizzes"> | number
    user_id?: IntFilter<"quizzes"> | number
    title?: StringFilter<"quizzes"> | string
    description?: StringNullableFilter<"quizzes"> | string | null
    negative_marking?: BoolNullableFilter<"quizzes"> | boolean | null
    team_mode?: BoolNullableFilter<"quizzes"> | boolean | null
    status?: Enumquizzes_statusNullableFilter<"quizzes"> | $Enums.quizzes_status | null
    created_at?: DateTimeNullableFilter<"quizzes"> | Date | string | null
    participant_history?: Participant_historyListRelationFilter
    questions?: QuestionsListRelationFilter
    quiz_sessions?: Quiz_sessionsListRelationFilter
    teams?: TeamsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type quizzesOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    negative_marking?: SortOrderInput | SortOrder
    team_mode?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    participant_history?: participant_historyOrderByRelationAggregateInput
    questions?: questionsOrderByRelationAggregateInput
    quiz_sessions?: quiz_sessionsOrderByRelationAggregateInput
    teams?: teamsOrderByRelationAggregateInput
    users?: usersOrderByWithRelationInput
    _relevance?: quizzesOrderByRelevanceInput
  }

  export type quizzesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: quizzesWhereInput | quizzesWhereInput[]
    OR?: quizzesWhereInput[]
    NOT?: quizzesWhereInput | quizzesWhereInput[]
    user_id?: IntFilter<"quizzes"> | number
    title?: StringFilter<"quizzes"> | string
    description?: StringNullableFilter<"quizzes"> | string | null
    negative_marking?: BoolNullableFilter<"quizzes"> | boolean | null
    team_mode?: BoolNullableFilter<"quizzes"> | boolean | null
    status?: Enumquizzes_statusNullableFilter<"quizzes"> | $Enums.quizzes_status | null
    created_at?: DateTimeNullableFilter<"quizzes"> | Date | string | null
    participant_history?: Participant_historyListRelationFilter
    questions?: QuestionsListRelationFilter
    quiz_sessions?: Quiz_sessionsListRelationFilter
    teams?: TeamsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type quizzesOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    negative_marking?: SortOrderInput | SortOrder
    team_mode?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: quizzesCountOrderByAggregateInput
    _avg?: quizzesAvgOrderByAggregateInput
    _max?: quizzesMaxOrderByAggregateInput
    _min?: quizzesMinOrderByAggregateInput
    _sum?: quizzesSumOrderByAggregateInput
  }

  export type quizzesScalarWhereWithAggregatesInput = {
    AND?: quizzesScalarWhereWithAggregatesInput | quizzesScalarWhereWithAggregatesInput[]
    OR?: quizzesScalarWhereWithAggregatesInput[]
    NOT?: quizzesScalarWhereWithAggregatesInput | quizzesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"quizzes"> | number
    user_id?: IntWithAggregatesFilter<"quizzes"> | number
    title?: StringWithAggregatesFilter<"quizzes"> | string
    description?: StringNullableWithAggregatesFilter<"quizzes"> | string | null
    negative_marking?: BoolNullableWithAggregatesFilter<"quizzes"> | boolean | null
    team_mode?: BoolNullableWithAggregatesFilter<"quizzes"> | boolean | null
    status?: Enumquizzes_statusNullableWithAggregatesFilter<"quizzes"> | $Enums.quizzes_status | null
    created_at?: DateTimeNullableWithAggregatesFilter<"quizzes"> | Date | string | null
  }

  export type session_participantsWhereInput = {
    AND?: session_participantsWhereInput | session_participantsWhereInput[]
    OR?: session_participantsWhereInput[]
    NOT?: session_participantsWhereInput | session_participantsWhereInput[]
    id?: IntFilter<"session_participants"> | number
    session_id?: IntFilter<"session_participants"> | number
    user_id?: IntFilter<"session_participants"> | number
    join_code?: StringNullableFilter<"session_participants"> | string | null
    team?: StringNullableFilter<"session_participants"> | string | null
    score?: IntNullableFilter<"session_participants"> | number | null
    streak?: IntNullableFilter<"session_participants"> | number | null
    accuracy?: FloatNullableFilter<"session_participants"> | number | null
    joined_at?: DateTimeNullableFilter<"session_participants"> | Date | string | null
    answers?: AnswersListRelationFilter
    quiz_sessions?: XOR<Quiz_sessionsScalarRelationFilter, quiz_sessionsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type session_participantsOrderByWithRelationInput = {
    id?: SortOrder
    session_id?: SortOrder
    user_id?: SortOrder
    join_code?: SortOrderInput | SortOrder
    team?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    streak?: SortOrderInput | SortOrder
    accuracy?: SortOrderInput | SortOrder
    joined_at?: SortOrderInput | SortOrder
    answers?: answersOrderByRelationAggregateInput
    quiz_sessions?: quiz_sessionsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    _relevance?: session_participantsOrderByRelevanceInput
  }

  export type session_participantsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: session_participantsWhereInput | session_participantsWhereInput[]
    OR?: session_participantsWhereInput[]
    NOT?: session_participantsWhereInput | session_participantsWhereInput[]
    session_id?: IntFilter<"session_participants"> | number
    user_id?: IntFilter<"session_participants"> | number
    join_code?: StringNullableFilter<"session_participants"> | string | null
    team?: StringNullableFilter<"session_participants"> | string | null
    score?: IntNullableFilter<"session_participants"> | number | null
    streak?: IntNullableFilter<"session_participants"> | number | null
    accuracy?: FloatNullableFilter<"session_participants"> | number | null
    joined_at?: DateTimeNullableFilter<"session_participants"> | Date | string | null
    answers?: AnswersListRelationFilter
    quiz_sessions?: XOR<Quiz_sessionsScalarRelationFilter, quiz_sessionsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type session_participantsOrderByWithAggregationInput = {
    id?: SortOrder
    session_id?: SortOrder
    user_id?: SortOrder
    join_code?: SortOrderInput | SortOrder
    team?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    streak?: SortOrderInput | SortOrder
    accuracy?: SortOrderInput | SortOrder
    joined_at?: SortOrderInput | SortOrder
    _count?: session_participantsCountOrderByAggregateInput
    _avg?: session_participantsAvgOrderByAggregateInput
    _max?: session_participantsMaxOrderByAggregateInput
    _min?: session_participantsMinOrderByAggregateInput
    _sum?: session_participantsSumOrderByAggregateInput
  }

  export type session_participantsScalarWhereWithAggregatesInput = {
    AND?: session_participantsScalarWhereWithAggregatesInput | session_participantsScalarWhereWithAggregatesInput[]
    OR?: session_participantsScalarWhereWithAggregatesInput[]
    NOT?: session_participantsScalarWhereWithAggregatesInput | session_participantsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"session_participants"> | number
    session_id?: IntWithAggregatesFilter<"session_participants"> | number
    user_id?: IntWithAggregatesFilter<"session_participants"> | number
    join_code?: StringNullableWithAggregatesFilter<"session_participants"> | string | null
    team?: StringNullableWithAggregatesFilter<"session_participants"> | string | null
    score?: IntNullableWithAggregatesFilter<"session_participants"> | number | null
    streak?: IntNullableWithAggregatesFilter<"session_participants"> | number | null
    accuracy?: FloatNullableWithAggregatesFilter<"session_participants"> | number | null
    joined_at?: DateTimeNullableWithAggregatesFilter<"session_participants"> | Date | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    username?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    role?: Enumusers_roleFilter<"users"> | $Enums.users_role
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    participant_history?: Participant_historyListRelationFilter
    quiz_sessions?: Quiz_sessionsListRelationFilter
    quizzes?: QuizzesListRelationFilter
    session_participants?: Session_participantsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    role?: SortOrder
    created_at?: SortOrderInput | SortOrder
    participant_history?: participant_historyOrderByRelationAggregateInput
    quiz_sessions?: quiz_sessionsOrderByRelationAggregateInput
    quizzes?: quizzesOrderByRelationAggregateInput
    session_participants?: session_participantsOrderByRelationAggregateInput
    _relevance?: usersOrderByRelevanceInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password?: StringFilter<"users"> | string
    role?: Enumusers_roleFilter<"users"> | $Enums.users_role
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    participant_history?: Participant_historyListRelationFilter
    quiz_sessions?: Quiz_sessionsListRelationFilter
    quizzes?: QuizzesListRelationFilter
    session_participants?: Session_participantsListRelationFilter
  }, "id" | "username" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    role?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    username?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    role?: Enumusers_roleWithAggregatesFilter<"users"> | $Enums.users_role
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type answersCreateInput = {
    selected_option?: string | null
    is_correct?: boolean | null
    time_taken?: number | null
    points_awarded?: number | null
    streak_at_time?: number | null
    answered_at?: Date | string | null
    session_participants: session_participantsCreateNestedOneWithoutAnswersInput
    questions: questionsCreateNestedOneWithoutAnswersInput
  }

  export type answersUncheckedCreateInput = {
    id?: number
    session_participant_id: number
    question_id: number
    selected_option?: string | null
    is_correct?: boolean | null
    time_taken?: number | null
    points_awarded?: number | null
    streak_at_time?: number | null
    answered_at?: Date | string | null
  }

  export type answersUpdateInput = {
    selected_option?: NullableStringFieldUpdateOperationsInput | string | null
    is_correct?: NullableBoolFieldUpdateOperationsInput | boolean | null
    time_taken?: NullableIntFieldUpdateOperationsInput | number | null
    points_awarded?: NullableIntFieldUpdateOperationsInput | number | null
    streak_at_time?: NullableIntFieldUpdateOperationsInput | number | null
    answered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    session_participants?: session_participantsUpdateOneRequiredWithoutAnswersNestedInput
    questions?: questionsUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type answersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    session_participant_id?: IntFieldUpdateOperationsInput | number
    question_id?: IntFieldUpdateOperationsInput | number
    selected_option?: NullableStringFieldUpdateOperationsInput | string | null
    is_correct?: NullableBoolFieldUpdateOperationsInput | boolean | null
    time_taken?: NullableIntFieldUpdateOperationsInput | number | null
    points_awarded?: NullableIntFieldUpdateOperationsInput | number | null
    streak_at_time?: NullableIntFieldUpdateOperationsInput | number | null
    answered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type answersCreateManyInput = {
    id?: number
    session_participant_id: number
    question_id: number
    selected_option?: string | null
    is_correct?: boolean | null
    time_taken?: number | null
    points_awarded?: number | null
    streak_at_time?: number | null
    answered_at?: Date | string | null
  }

  export type answersUpdateManyMutationInput = {
    selected_option?: NullableStringFieldUpdateOperationsInput | string | null
    is_correct?: NullableBoolFieldUpdateOperationsInput | boolean | null
    time_taken?: NullableIntFieldUpdateOperationsInput | number | null
    points_awarded?: NullableIntFieldUpdateOperationsInput | number | null
    streak_at_time?: NullableIntFieldUpdateOperationsInput | number | null
    answered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type answersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    session_participant_id?: IntFieldUpdateOperationsInput | number
    question_id?: IntFieldUpdateOperationsInput | number
    selected_option?: NullableStringFieldUpdateOperationsInput | string | null
    is_correct?: NullableBoolFieldUpdateOperationsInput | boolean | null
    time_taken?: NullableIntFieldUpdateOperationsInput | number | null
    points_awarded?: NullableIntFieldUpdateOperationsInput | number | null
    streak_at_time?: NullableIntFieldUpdateOperationsInput | number | null
    answered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type optionsCreateInput = {
    option_text: string
    option_index: number
    questions: questionsCreateNestedOneWithoutOptionsInput
  }

  export type optionsUncheckedCreateInput = {
    id?: number
    question_id: number
    option_text: string
    option_index: number
  }

  export type optionsUpdateInput = {
    option_text?: StringFieldUpdateOperationsInput | string
    option_index?: IntFieldUpdateOperationsInput | number
    questions?: questionsUpdateOneRequiredWithoutOptionsNestedInput
  }

  export type optionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    question_id?: IntFieldUpdateOperationsInput | number
    option_text?: StringFieldUpdateOperationsInput | string
    option_index?: IntFieldUpdateOperationsInput | number
  }

  export type optionsCreateManyInput = {
    id?: number
    question_id: number
    option_text: string
    option_index: number
  }

  export type optionsUpdateManyMutationInput = {
    option_text?: StringFieldUpdateOperationsInput | string
    option_index?: IntFieldUpdateOperationsInput | number
  }

  export type optionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    question_id?: IntFieldUpdateOperationsInput | number
    option_text?: StringFieldUpdateOperationsInput | string
    option_index?: IntFieldUpdateOperationsInput | number
  }

  export type matching_pairsCreateInput = {
    left_item: string
    right_item: string
    pair_index: number
    questions: questionsCreateNestedOneWithoutMatching_pairsInput
  }

  export type matching_pairsUncheckedCreateInput = {
    id?: number
    question_id: number
    left_item: string
    right_item: string
    pair_index: number
  }

  export type matching_pairsUpdateInput = {
    left_item?: StringFieldUpdateOperationsInput | string
    right_item?: StringFieldUpdateOperationsInput | string
    pair_index?: IntFieldUpdateOperationsInput | number
    questions?: questionsUpdateOneRequiredWithoutMatching_pairsNestedInput
  }

  export type matching_pairsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    question_id?: IntFieldUpdateOperationsInput | number
    left_item?: StringFieldUpdateOperationsInput | string
    right_item?: StringFieldUpdateOperationsInput | string
    pair_index?: IntFieldUpdateOperationsInput | number
  }

  export type matching_pairsCreateManyInput = {
    id?: number
    question_id: number
    left_item: string
    right_item: string
    pair_index: number
  }

  export type matching_pairsUpdateManyMutationInput = {
    left_item?: StringFieldUpdateOperationsInput | string
    right_item?: StringFieldUpdateOperationsInput | string
    pair_index?: IntFieldUpdateOperationsInput | number
  }

  export type matching_pairsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    question_id?: IntFieldUpdateOperationsInput | number
    left_item?: StringFieldUpdateOperationsInput | string
    right_item?: StringFieldUpdateOperationsInput | string
    pair_index?: IntFieldUpdateOperationsInput | number
  }

  export type drag_drop_itemsCreateInput = {
    item_text: string
    category: string
    item_index: number
    questions: questionsCreateNestedOneWithoutDrag_drop_itemsInput
  }

  export type drag_drop_itemsUncheckedCreateInput = {
    id?: number
    question_id: number
    item_text: string
    category: string
    item_index: number
  }

  export type drag_drop_itemsUpdateInput = {
    item_text?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_index?: IntFieldUpdateOperationsInput | number
    questions?: questionsUpdateOneRequiredWithoutDrag_drop_itemsNestedInput
  }

  export type drag_drop_itemsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    question_id?: IntFieldUpdateOperationsInput | number
    item_text?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_index?: IntFieldUpdateOperationsInput | number
  }

  export type drag_drop_itemsCreateManyInput = {
    id?: number
    question_id: number
    item_text: string
    category: string
    item_index: number
  }

  export type drag_drop_itemsUpdateManyMutationInput = {
    item_text?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_index?: IntFieldUpdateOperationsInput | number
  }

  export type drag_drop_itemsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    question_id?: IntFieldUpdateOperationsInput | number
    item_text?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_index?: IntFieldUpdateOperationsInput | number
  }

  export type ordering_itemsCreateInput = {
    item_text: string
    correct_order: number
    questions: questionsCreateNestedOneWithoutOrdering_itemsInput
  }

  export type ordering_itemsUncheckedCreateInput = {
    id?: number
    question_id: number
    item_text: string
    correct_order: number
  }

  export type ordering_itemsUpdateInput = {
    item_text?: StringFieldUpdateOperationsInput | string
    correct_order?: IntFieldUpdateOperationsInput | number
    questions?: questionsUpdateOneRequiredWithoutOrdering_itemsNestedInput
  }

  export type ordering_itemsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    question_id?: IntFieldUpdateOperationsInput | number
    item_text?: StringFieldUpdateOperationsInput | string
    correct_order?: IntFieldUpdateOperationsInput | number
  }

  export type ordering_itemsCreateManyInput = {
    id?: number
    question_id: number
    item_text: string
    correct_order: number
  }

  export type ordering_itemsUpdateManyMutationInput = {
    item_text?: StringFieldUpdateOperationsInput | string
    correct_order?: IntFieldUpdateOperationsInput | number
  }

  export type ordering_itemsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    question_id?: IntFieldUpdateOperationsInput | number
    item_text?: StringFieldUpdateOperationsInput | string
    correct_order?: IntFieldUpdateOperationsInput | number
  }

  export type teamsCreateInput = {
    name: string
    color: string
    max_members?: number
    created_at?: Date | string | null
    quizzes: quizzesCreateNestedOneWithoutTeamsInput
  }

  export type teamsUncheckedCreateInput = {
    id?: number
    quiz_id: number
    name: string
    color: string
    max_members?: number
    created_at?: Date | string | null
  }

  export type teamsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    max_members?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quizzes?: quizzesUpdateOneRequiredWithoutTeamsNestedInput
  }

  export type teamsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    max_members?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type teamsCreateManyInput = {
    id?: number
    quiz_id: number
    name: string
    color: string
    max_members?: number
    created_at?: Date | string | null
  }

  export type teamsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    max_members?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type teamsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    max_members?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type participant_historyCreateInput = {
    total_sessions?: number | null
    total_score?: number | null
    total_correct?: number | null
    total_questions?: number | null
    best_streak?: number | null
    last_played?: Date | string | null
    users: usersCreateNestedOneWithoutParticipant_historyInput
    quizzes: quizzesCreateNestedOneWithoutParticipant_historyInput
  }

  export type participant_historyUncheckedCreateInput = {
    id?: number
    user_id: number
    quiz_id: number
    total_sessions?: number | null
    total_score?: number | null
    total_correct?: number | null
    total_questions?: number | null
    best_streak?: number | null
    last_played?: Date | string | null
  }

  export type participant_historyUpdateInput = {
    total_sessions?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: NullableIntFieldUpdateOperationsInput | number | null
    total_correct?: NullableIntFieldUpdateOperationsInput | number | null
    total_questions?: NullableIntFieldUpdateOperationsInput | number | null
    best_streak?: NullableIntFieldUpdateOperationsInput | number | null
    last_played?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutParticipant_historyNestedInput
    quizzes?: quizzesUpdateOneRequiredWithoutParticipant_historyNestedInput
  }

  export type participant_historyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    total_sessions?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: NullableIntFieldUpdateOperationsInput | number | null
    total_correct?: NullableIntFieldUpdateOperationsInput | number | null
    total_questions?: NullableIntFieldUpdateOperationsInput | number | null
    best_streak?: NullableIntFieldUpdateOperationsInput | number | null
    last_played?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type participant_historyCreateManyInput = {
    id?: number
    user_id: number
    quiz_id: number
    total_sessions?: number | null
    total_score?: number | null
    total_correct?: number | null
    total_questions?: number | null
    best_streak?: number | null
    last_played?: Date | string | null
  }

  export type participant_historyUpdateManyMutationInput = {
    total_sessions?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: NullableIntFieldUpdateOperationsInput | number | null
    total_correct?: NullableIntFieldUpdateOperationsInput | number | null
    total_questions?: NullableIntFieldUpdateOperationsInput | number | null
    best_streak?: NullableIntFieldUpdateOperationsInput | number | null
    last_played?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type participant_historyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    total_sessions?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: NullableIntFieldUpdateOperationsInput | number | null
    total_correct?: NullableIntFieldUpdateOperationsInput | number | null
    total_questions?: NullableIntFieldUpdateOperationsInput | number | null
    best_streak?: NullableIntFieldUpdateOperationsInput | number | null
    last_played?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type questionsCreateInput = {
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    answers?: answersCreateNestedManyWithoutQuestionsInput
    options?: optionsCreateNestedManyWithoutQuestionsInput
    matching_pairs?: matching_pairsCreateNestedManyWithoutQuestionsInput
    drag_drop_items?: drag_drop_itemsCreateNestedManyWithoutQuestionsInput
    ordering_items?: ordering_itemsCreateNestedManyWithoutQuestionsInput
    quizzes: quizzesCreateNestedOneWithoutQuestionsInput
  }

  export type questionsUncheckedCreateInput = {
    id?: number
    quiz_id: number
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    answers?: answersUncheckedCreateNestedManyWithoutQuestionsInput
    options?: optionsUncheckedCreateNestedManyWithoutQuestionsInput
    matching_pairs?: matching_pairsUncheckedCreateNestedManyWithoutQuestionsInput
    drag_drop_items?: drag_drop_itemsUncheckedCreateNestedManyWithoutQuestionsInput
    ordering_items?: ordering_itemsUncheckedCreateNestedManyWithoutQuestionsInput
  }

  export type questionsUpdateInput = {
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: answersUpdateManyWithoutQuestionsNestedInput
    options?: optionsUpdateManyWithoutQuestionsNestedInput
    matching_pairs?: matching_pairsUpdateManyWithoutQuestionsNestedInput
    drag_drop_items?: drag_drop_itemsUpdateManyWithoutQuestionsNestedInput
    ordering_items?: ordering_itemsUpdateManyWithoutQuestionsNestedInput
    quizzes?: quizzesUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type questionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: answersUncheckedUpdateManyWithoutQuestionsNestedInput
    options?: optionsUncheckedUpdateManyWithoutQuestionsNestedInput
    matching_pairs?: matching_pairsUncheckedUpdateManyWithoutQuestionsNestedInput
    drag_drop_items?: drag_drop_itemsUncheckedUpdateManyWithoutQuestionsNestedInput
    ordering_items?: ordering_itemsUncheckedUpdateManyWithoutQuestionsNestedInput
  }

  export type questionsCreateManyInput = {
    id?: number
    quiz_id: number
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
  }

  export type questionsUpdateManyMutationInput = {
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type questionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type quiz_sessionsCreateInput = {
    code: string
    status?: $Enums.quiz_sessions_status | null
    started_at?: Date | string | null
    ended_at?: Date | string | null
    quizzes: quizzesCreateNestedOneWithoutQuiz_sessionsInput
    users: usersCreateNestedOneWithoutQuiz_sessionsInput
    session_participants?: session_participantsCreateNestedManyWithoutQuiz_sessionsInput
  }

  export type quiz_sessionsUncheckedCreateInput = {
    id?: number
    quiz_id: number
    host_id: number
    code: string
    status?: $Enums.quiz_sessions_status | null
    started_at?: Date | string | null
    ended_at?: Date | string | null
    session_participants?: session_participantsUncheckedCreateNestedManyWithoutQuiz_sessionsInput
  }

  export type quiz_sessionsUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    status?: NullableEnumquiz_sessions_statusFieldUpdateOperationsInput | $Enums.quiz_sessions_status | null
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quizzes?: quizzesUpdateOneRequiredWithoutQuiz_sessionsNestedInput
    users?: usersUpdateOneRequiredWithoutQuiz_sessionsNestedInput
    session_participants?: session_participantsUpdateManyWithoutQuiz_sessionsNestedInput
  }

  export type quiz_sessionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    host_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: NullableEnumquiz_sessions_statusFieldUpdateOperationsInput | $Enums.quiz_sessions_status | null
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    session_participants?: session_participantsUncheckedUpdateManyWithoutQuiz_sessionsNestedInput
  }

  export type quiz_sessionsCreateManyInput = {
    id?: number
    quiz_id: number
    host_id: number
    code: string
    status?: $Enums.quiz_sessions_status | null
    started_at?: Date | string | null
    ended_at?: Date | string | null
  }

  export type quiz_sessionsUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    status?: NullableEnumquiz_sessions_statusFieldUpdateOperationsInput | $Enums.quiz_sessions_status | null
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type quiz_sessionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    host_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: NullableEnumquiz_sessions_statusFieldUpdateOperationsInput | $Enums.quiz_sessions_status | null
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type quizzesCreateInput = {
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
    participant_history?: participant_historyCreateNestedManyWithoutQuizzesInput
    questions?: questionsCreateNestedManyWithoutQuizzesInput
    quiz_sessions?: quiz_sessionsCreateNestedManyWithoutQuizzesInput
    teams?: teamsCreateNestedManyWithoutQuizzesInput
    users: usersCreateNestedOneWithoutQuizzesInput
  }

  export type quizzesUncheckedCreateInput = {
    id?: number
    user_id: number
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
    participant_history?: participant_historyUncheckedCreateNestedManyWithoutQuizzesInput
    questions?: questionsUncheckedCreateNestedManyWithoutQuizzesInput
    quiz_sessions?: quiz_sessionsUncheckedCreateNestedManyWithoutQuizzesInput
    teams?: teamsUncheckedCreateNestedManyWithoutQuizzesInput
  }

  export type quizzesUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUpdateManyWithoutQuizzesNestedInput
    questions?: questionsUpdateManyWithoutQuizzesNestedInput
    quiz_sessions?: quiz_sessionsUpdateManyWithoutQuizzesNestedInput
    teams?: teamsUpdateManyWithoutQuizzesNestedInput
    users?: usersUpdateOneRequiredWithoutQuizzesNestedInput
  }

  export type quizzesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUncheckedUpdateManyWithoutQuizzesNestedInput
    questions?: questionsUncheckedUpdateManyWithoutQuizzesNestedInput
    quiz_sessions?: quiz_sessionsUncheckedUpdateManyWithoutQuizzesNestedInput
    teams?: teamsUncheckedUpdateManyWithoutQuizzesNestedInput
  }

  export type quizzesCreateManyInput = {
    id?: number
    user_id: number
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
  }

  export type quizzesUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type quizzesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type session_participantsCreateInput = {
    join_code?: string | null
    team?: string | null
    score?: number | null
    streak?: number | null
    accuracy?: number | null
    joined_at?: Date | string | null
    answers?: answersCreateNestedManyWithoutSession_participantsInput
    quiz_sessions: quiz_sessionsCreateNestedOneWithoutSession_participantsInput
    users: usersCreateNestedOneWithoutSession_participantsInput
  }

  export type session_participantsUncheckedCreateInput = {
    id?: number
    session_id: number
    user_id: number
    join_code?: string | null
    team?: string | null
    score?: number | null
    streak?: number | null
    accuracy?: number | null
    joined_at?: Date | string | null
    answers?: answersUncheckedCreateNestedManyWithoutSession_participantsInput
  }

  export type session_participantsUpdateInput = {
    join_code?: NullableStringFieldUpdateOperationsInput | string | null
    team?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: answersUpdateManyWithoutSession_participantsNestedInput
    quiz_sessions?: quiz_sessionsUpdateOneRequiredWithoutSession_participantsNestedInput
    users?: usersUpdateOneRequiredWithoutSession_participantsNestedInput
  }

  export type session_participantsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    join_code?: NullableStringFieldUpdateOperationsInput | string | null
    team?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: answersUncheckedUpdateManyWithoutSession_participantsNestedInput
  }

  export type session_participantsCreateManyInput = {
    id?: number
    session_id: number
    user_id: number
    join_code?: string | null
    team?: string | null
    score?: number | null
    streak?: number | null
    accuracy?: number | null
    joined_at?: Date | string | null
  }

  export type session_participantsUpdateManyMutationInput = {
    join_code?: NullableStringFieldUpdateOperationsInput | string | null
    team?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type session_participantsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    join_code?: NullableStringFieldUpdateOperationsInput | string | null
    team?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersCreateInput = {
    username: string
    password: string
    email: string
    role?: $Enums.users_role
    created_at?: Date | string | null
    participant_history?: participant_historyCreateNestedManyWithoutUsersInput
    quiz_sessions?: quiz_sessionsCreateNestedManyWithoutUsersInput
    quizzes?: quizzesCreateNestedManyWithoutUsersInput
    session_participants?: session_participantsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    email: string
    role?: $Enums.users_role
    created_at?: Date | string | null
    participant_history?: participant_historyUncheckedCreateNestedManyWithoutUsersInput
    quiz_sessions?: quiz_sessionsUncheckedCreateNestedManyWithoutUsersInput
    quizzes?: quizzesUncheckedCreateNestedManyWithoutUsersInput
    session_participants?: session_participantsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUpdateManyWithoutUsersNestedInput
    quiz_sessions?: quiz_sessionsUpdateManyWithoutUsersNestedInput
    quizzes?: quizzesUpdateManyWithoutUsersNestedInput
    session_participants?: session_participantsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUncheckedUpdateManyWithoutUsersNestedInput
    quiz_sessions?: quiz_sessionsUncheckedUpdateManyWithoutUsersNestedInput
    quizzes?: quizzesUncheckedUpdateManyWithoutUsersNestedInput
    session_participants?: session_participantsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: number
    username: string
    password: string
    email: string
    role?: $Enums.users_role
    created_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type Session_participantsScalarRelationFilter = {
    is?: session_participantsWhereInput
    isNot?: session_participantsWhereInput
  }

  export type QuestionsScalarRelationFilter = {
    is?: questionsWhereInput
    isNot?: questionsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type answersOrderByRelevanceInput = {
    fields: answersOrderByRelevanceFieldEnum | answersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type answersCountOrderByAggregateInput = {
    id?: SortOrder
    session_participant_id?: SortOrder
    question_id?: SortOrder
    selected_option?: SortOrder
    is_correct?: SortOrder
    time_taken?: SortOrder
    points_awarded?: SortOrder
    streak_at_time?: SortOrder
    answered_at?: SortOrder
  }

  export type answersAvgOrderByAggregateInput = {
    id?: SortOrder
    session_participant_id?: SortOrder
    question_id?: SortOrder
    time_taken?: SortOrder
    points_awarded?: SortOrder
    streak_at_time?: SortOrder
  }

  export type answersMaxOrderByAggregateInput = {
    id?: SortOrder
    session_participant_id?: SortOrder
    question_id?: SortOrder
    selected_option?: SortOrder
    is_correct?: SortOrder
    time_taken?: SortOrder
    points_awarded?: SortOrder
    streak_at_time?: SortOrder
    answered_at?: SortOrder
  }

  export type answersMinOrderByAggregateInput = {
    id?: SortOrder
    session_participant_id?: SortOrder
    question_id?: SortOrder
    selected_option?: SortOrder
    is_correct?: SortOrder
    time_taken?: SortOrder
    points_awarded?: SortOrder
    streak_at_time?: SortOrder
    answered_at?: SortOrder
  }

  export type answersSumOrderByAggregateInput = {
    id?: SortOrder
    session_participant_id?: SortOrder
    question_id?: SortOrder
    time_taken?: SortOrder
    points_awarded?: SortOrder
    streak_at_time?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type optionsOrderByRelevanceInput = {
    fields: optionsOrderByRelevanceFieldEnum | optionsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type optionsCountOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    option_text?: SortOrder
    option_index?: SortOrder
  }

  export type optionsAvgOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    option_index?: SortOrder
  }

  export type optionsMaxOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    option_text?: SortOrder
    option_index?: SortOrder
  }

  export type optionsMinOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    option_text?: SortOrder
    option_index?: SortOrder
  }

  export type optionsSumOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    option_index?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type matching_pairsOrderByRelevanceInput = {
    fields: matching_pairsOrderByRelevanceFieldEnum | matching_pairsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type matching_pairsCountOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    left_item?: SortOrder
    right_item?: SortOrder
    pair_index?: SortOrder
  }

  export type matching_pairsAvgOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    pair_index?: SortOrder
  }

  export type matching_pairsMaxOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    left_item?: SortOrder
    right_item?: SortOrder
    pair_index?: SortOrder
  }

  export type matching_pairsMinOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    left_item?: SortOrder
    right_item?: SortOrder
    pair_index?: SortOrder
  }

  export type matching_pairsSumOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    pair_index?: SortOrder
  }

  export type drag_drop_itemsOrderByRelevanceInput = {
    fields: drag_drop_itemsOrderByRelevanceFieldEnum | drag_drop_itemsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type drag_drop_itemsCountOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    item_text?: SortOrder
    category?: SortOrder
    item_index?: SortOrder
  }

  export type drag_drop_itemsAvgOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    item_index?: SortOrder
  }

  export type drag_drop_itemsMaxOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    item_text?: SortOrder
    category?: SortOrder
    item_index?: SortOrder
  }

  export type drag_drop_itemsMinOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    item_text?: SortOrder
    category?: SortOrder
    item_index?: SortOrder
  }

  export type drag_drop_itemsSumOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    item_index?: SortOrder
  }

  export type ordering_itemsOrderByRelevanceInput = {
    fields: ordering_itemsOrderByRelevanceFieldEnum | ordering_itemsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ordering_itemsCountOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    item_text?: SortOrder
    correct_order?: SortOrder
  }

  export type ordering_itemsAvgOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    correct_order?: SortOrder
  }

  export type ordering_itemsMaxOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    item_text?: SortOrder
    correct_order?: SortOrder
  }

  export type ordering_itemsMinOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    item_text?: SortOrder
    correct_order?: SortOrder
  }

  export type ordering_itemsSumOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
    correct_order?: SortOrder
  }

  export type QuizzesScalarRelationFilter = {
    is?: quizzesWhereInput
    isNot?: quizzesWhereInput
  }

  export type teamsOrderByRelevanceInput = {
    fields: teamsOrderByRelevanceFieldEnum | teamsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type teamsCountOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    max_members?: SortOrder
    created_at?: SortOrder
  }

  export type teamsAvgOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    max_members?: SortOrder
  }

  export type teamsMaxOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    max_members?: SortOrder
    created_at?: SortOrder
  }

  export type teamsMinOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    max_members?: SortOrder
    created_at?: SortOrder
  }

  export type teamsSumOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    max_members?: SortOrder
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type participant_historyCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_id?: SortOrder
    total_sessions?: SortOrder
    total_score?: SortOrder
    total_correct?: SortOrder
    total_questions?: SortOrder
    best_streak?: SortOrder
    last_played?: SortOrder
  }

  export type participant_historyAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_id?: SortOrder
    total_sessions?: SortOrder
    total_score?: SortOrder
    total_correct?: SortOrder
    total_questions?: SortOrder
    best_streak?: SortOrder
  }

  export type participant_historyMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_id?: SortOrder
    total_sessions?: SortOrder
    total_score?: SortOrder
    total_correct?: SortOrder
    total_questions?: SortOrder
    best_streak?: SortOrder
    last_played?: SortOrder
  }

  export type participant_historyMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_id?: SortOrder
    total_sessions?: SortOrder
    total_score?: SortOrder
    total_correct?: SortOrder
    total_questions?: SortOrder
    best_streak?: SortOrder
    last_played?: SortOrder
  }

  export type participant_historySumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_id?: SortOrder
    total_sessions?: SortOrder
    total_score?: SortOrder
    total_correct?: SortOrder
    total_questions?: SortOrder
    best_streak?: SortOrder
  }

  export type Enumquestions_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.questions_type | Enumquestions_typeFieldRefInput<$PrismaModel>
    in?: $Enums.questions_type[]
    notIn?: $Enums.questions_type[]
    not?: NestedEnumquestions_typeFilter<$PrismaModel> | $Enums.questions_type
  }

  export type Enumquestions_media_typeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.questions_media_type | Enumquestions_media_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.questions_media_type[] | null
    notIn?: $Enums.questions_media_type[] | null
    not?: NestedEnumquestions_media_typeNullableFilter<$PrismaModel> | $Enums.questions_media_type | null
  }

  export type AnswersListRelationFilter = {
    every?: answersWhereInput
    some?: answersWhereInput
    none?: answersWhereInput
  }

  export type OptionsListRelationFilter = {
    every?: optionsWhereInput
    some?: optionsWhereInput
    none?: optionsWhereInput
  }

  export type Matching_pairsListRelationFilter = {
    every?: matching_pairsWhereInput
    some?: matching_pairsWhereInput
    none?: matching_pairsWhereInput
  }

  export type Drag_drop_itemsListRelationFilter = {
    every?: drag_drop_itemsWhereInput
    some?: drag_drop_itemsWhereInput
    none?: drag_drop_itemsWhereInput
  }

  export type Ordering_itemsListRelationFilter = {
    every?: ordering_itemsWhereInput
    some?: ordering_itemsWhereInput
    none?: ordering_itemsWhereInput
  }

  export type answersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type optionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type matching_pairsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type drag_drop_itemsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ordering_itemsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type questionsOrderByRelevanceInput = {
    fields: questionsOrderByRelevanceFieldEnum | questionsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type questionsCountOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    type?: SortOrder
    question?: SortOrder
    correct_answer?: SortOrder
    time_limit?: SortOrder
    points?: SortOrder
    category?: SortOrder
    media_type?: SortOrder
    media_url?: SortOrder
  }

  export type questionsAvgOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    time_limit?: SortOrder
    points?: SortOrder
  }

  export type questionsMaxOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    type?: SortOrder
    question?: SortOrder
    correct_answer?: SortOrder
    time_limit?: SortOrder
    points?: SortOrder
    category?: SortOrder
    media_type?: SortOrder
    media_url?: SortOrder
  }

  export type questionsMinOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    type?: SortOrder
    question?: SortOrder
    correct_answer?: SortOrder
    time_limit?: SortOrder
    points?: SortOrder
    category?: SortOrder
    media_type?: SortOrder
    media_url?: SortOrder
  }

  export type questionsSumOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    time_limit?: SortOrder
    points?: SortOrder
  }

  export type Enumquestions_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.questions_type | Enumquestions_typeFieldRefInput<$PrismaModel>
    in?: $Enums.questions_type[]
    notIn?: $Enums.questions_type[]
    not?: NestedEnumquestions_typeWithAggregatesFilter<$PrismaModel> | $Enums.questions_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumquestions_typeFilter<$PrismaModel>
    _max?: NestedEnumquestions_typeFilter<$PrismaModel>
  }

  export type Enumquestions_media_typeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.questions_media_type | Enumquestions_media_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.questions_media_type[] | null
    notIn?: $Enums.questions_media_type[] | null
    not?: NestedEnumquestions_media_typeNullableWithAggregatesFilter<$PrismaModel> | $Enums.questions_media_type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumquestions_media_typeNullableFilter<$PrismaModel>
    _max?: NestedEnumquestions_media_typeNullableFilter<$PrismaModel>
  }

  export type Enumquiz_sessions_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.quiz_sessions_status | Enumquiz_sessions_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.quiz_sessions_status[] | null
    notIn?: $Enums.quiz_sessions_status[] | null
    not?: NestedEnumquiz_sessions_statusNullableFilter<$PrismaModel> | $Enums.quiz_sessions_status | null
  }

  export type Session_participantsListRelationFilter = {
    every?: session_participantsWhereInput
    some?: session_participantsWhereInput
    none?: session_participantsWhereInput
  }

  export type session_participantsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type quiz_sessionsOrderByRelevanceInput = {
    fields: quiz_sessionsOrderByRelevanceFieldEnum | quiz_sessionsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type quiz_sessionsCountOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    host_id?: SortOrder
    code?: SortOrder
    status?: SortOrder
    started_at?: SortOrder
    ended_at?: SortOrder
  }

  export type quiz_sessionsAvgOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    host_id?: SortOrder
  }

  export type quiz_sessionsMaxOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    host_id?: SortOrder
    code?: SortOrder
    status?: SortOrder
    started_at?: SortOrder
    ended_at?: SortOrder
  }

  export type quiz_sessionsMinOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    host_id?: SortOrder
    code?: SortOrder
    status?: SortOrder
    started_at?: SortOrder
    ended_at?: SortOrder
  }

  export type quiz_sessionsSumOrderByAggregateInput = {
    id?: SortOrder
    quiz_id?: SortOrder
    host_id?: SortOrder
  }

  export type Enumquiz_sessions_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.quiz_sessions_status | Enumquiz_sessions_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.quiz_sessions_status[] | null
    notIn?: $Enums.quiz_sessions_status[] | null
    not?: NestedEnumquiz_sessions_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.quiz_sessions_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumquiz_sessions_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumquiz_sessions_statusNullableFilter<$PrismaModel>
  }

  export type Enumquizzes_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.quizzes_status | Enumquizzes_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.quizzes_status[] | null
    notIn?: $Enums.quizzes_status[] | null
    not?: NestedEnumquizzes_statusNullableFilter<$PrismaModel> | $Enums.quizzes_status | null
  }

  export type Participant_historyListRelationFilter = {
    every?: participant_historyWhereInput
    some?: participant_historyWhereInput
    none?: participant_historyWhereInput
  }

  export type QuestionsListRelationFilter = {
    every?: questionsWhereInput
    some?: questionsWhereInput
    none?: questionsWhereInput
  }

  export type Quiz_sessionsListRelationFilter = {
    every?: quiz_sessionsWhereInput
    some?: quiz_sessionsWhereInput
    none?: quiz_sessionsWhereInput
  }

  export type TeamsListRelationFilter = {
    every?: teamsWhereInput
    some?: teamsWhereInput
    none?: teamsWhereInput
  }

  export type participant_historyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type questionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type quiz_sessionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type teamsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type quizzesOrderByRelevanceInput = {
    fields: quizzesOrderByRelevanceFieldEnum | quizzesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type quizzesCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    negative_marking?: SortOrder
    team_mode?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type quizzesAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type quizzesMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    negative_marking?: SortOrder
    team_mode?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type quizzesMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    negative_marking?: SortOrder
    team_mode?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type quizzesSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type Enumquizzes_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.quizzes_status | Enumquizzes_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.quizzes_status[] | null
    notIn?: $Enums.quizzes_status[] | null
    not?: NestedEnumquizzes_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.quizzes_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumquizzes_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumquizzes_statusNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type Quiz_sessionsScalarRelationFilter = {
    is?: quiz_sessionsWhereInput
    isNot?: quiz_sessionsWhereInput
  }

  export type session_participantsOrderByRelevanceInput = {
    fields: session_participantsOrderByRelevanceFieldEnum | session_participantsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type session_participantsCountOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    user_id?: SortOrder
    join_code?: SortOrder
    team?: SortOrder
    score?: SortOrder
    streak?: SortOrder
    accuracy?: SortOrder
    joined_at?: SortOrder
  }

  export type session_participantsAvgOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    user_id?: SortOrder
    score?: SortOrder
    streak?: SortOrder
    accuracy?: SortOrder
  }

  export type session_participantsMaxOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    user_id?: SortOrder
    join_code?: SortOrder
    team?: SortOrder
    score?: SortOrder
    streak?: SortOrder
    accuracy?: SortOrder
    joined_at?: SortOrder
  }

  export type session_participantsMinOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    user_id?: SortOrder
    join_code?: SortOrder
    team?: SortOrder
    score?: SortOrder
    streak?: SortOrder
    accuracy?: SortOrder
    joined_at?: SortOrder
  }

  export type session_participantsSumOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    user_id?: SortOrder
    score?: SortOrder
    streak?: SortOrder
    accuracy?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type Enumusers_roleFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[]
    notIn?: $Enums.users_role[]
    not?: NestedEnumusers_roleFilter<$PrismaModel> | $Enums.users_role
  }

  export type QuizzesListRelationFilter = {
    every?: quizzesWhereInput
    some?: quizzesWhereInput
    none?: quizzesWhereInput
  }

  export type quizzesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelevanceInput = {
    fields: usersOrderByRelevanceFieldEnum | usersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Enumusers_roleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[]
    notIn?: $Enums.users_role[]
    not?: NestedEnumusers_roleWithAggregatesFilter<$PrismaModel> | $Enums.users_role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_roleFilter<$PrismaModel>
    _max?: NestedEnumusers_roleFilter<$PrismaModel>
  }

  export type session_participantsCreateNestedOneWithoutAnswersInput = {
    create?: XOR<session_participantsCreateWithoutAnswersInput, session_participantsUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: session_participantsCreateOrConnectWithoutAnswersInput
    connect?: session_participantsWhereUniqueInput
  }

  export type questionsCreateNestedOneWithoutAnswersInput = {
    create?: XOR<questionsCreateWithoutAnswersInput, questionsUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: questionsCreateOrConnectWithoutAnswersInput
    connect?: questionsWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type session_participantsUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<session_participantsCreateWithoutAnswersInput, session_participantsUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: session_participantsCreateOrConnectWithoutAnswersInput
    upsert?: session_participantsUpsertWithoutAnswersInput
    connect?: session_participantsWhereUniqueInput
    update?: XOR<XOR<session_participantsUpdateToOneWithWhereWithoutAnswersInput, session_participantsUpdateWithoutAnswersInput>, session_participantsUncheckedUpdateWithoutAnswersInput>
  }

  export type questionsUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<questionsCreateWithoutAnswersInput, questionsUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: questionsCreateOrConnectWithoutAnswersInput
    upsert?: questionsUpsertWithoutAnswersInput
    connect?: questionsWhereUniqueInput
    update?: XOR<XOR<questionsUpdateToOneWithWhereWithoutAnswersInput, questionsUpdateWithoutAnswersInput>, questionsUncheckedUpdateWithoutAnswersInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type questionsCreateNestedOneWithoutOptionsInput = {
    create?: XOR<questionsCreateWithoutOptionsInput, questionsUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: questionsCreateOrConnectWithoutOptionsInput
    connect?: questionsWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type questionsUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: XOR<questionsCreateWithoutOptionsInput, questionsUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: questionsCreateOrConnectWithoutOptionsInput
    upsert?: questionsUpsertWithoutOptionsInput
    connect?: questionsWhereUniqueInput
    update?: XOR<XOR<questionsUpdateToOneWithWhereWithoutOptionsInput, questionsUpdateWithoutOptionsInput>, questionsUncheckedUpdateWithoutOptionsInput>
  }

  export type questionsCreateNestedOneWithoutMatching_pairsInput = {
    create?: XOR<questionsCreateWithoutMatching_pairsInput, questionsUncheckedCreateWithoutMatching_pairsInput>
    connectOrCreate?: questionsCreateOrConnectWithoutMatching_pairsInput
    connect?: questionsWhereUniqueInput
  }

  export type questionsUpdateOneRequiredWithoutMatching_pairsNestedInput = {
    create?: XOR<questionsCreateWithoutMatching_pairsInput, questionsUncheckedCreateWithoutMatching_pairsInput>
    connectOrCreate?: questionsCreateOrConnectWithoutMatching_pairsInput
    upsert?: questionsUpsertWithoutMatching_pairsInput
    connect?: questionsWhereUniqueInput
    update?: XOR<XOR<questionsUpdateToOneWithWhereWithoutMatching_pairsInput, questionsUpdateWithoutMatching_pairsInput>, questionsUncheckedUpdateWithoutMatching_pairsInput>
  }

  export type questionsCreateNestedOneWithoutDrag_drop_itemsInput = {
    create?: XOR<questionsCreateWithoutDrag_drop_itemsInput, questionsUncheckedCreateWithoutDrag_drop_itemsInput>
    connectOrCreate?: questionsCreateOrConnectWithoutDrag_drop_itemsInput
    connect?: questionsWhereUniqueInput
  }

  export type questionsUpdateOneRequiredWithoutDrag_drop_itemsNestedInput = {
    create?: XOR<questionsCreateWithoutDrag_drop_itemsInput, questionsUncheckedCreateWithoutDrag_drop_itemsInput>
    connectOrCreate?: questionsCreateOrConnectWithoutDrag_drop_itemsInput
    upsert?: questionsUpsertWithoutDrag_drop_itemsInput
    connect?: questionsWhereUniqueInput
    update?: XOR<XOR<questionsUpdateToOneWithWhereWithoutDrag_drop_itemsInput, questionsUpdateWithoutDrag_drop_itemsInput>, questionsUncheckedUpdateWithoutDrag_drop_itemsInput>
  }

  export type questionsCreateNestedOneWithoutOrdering_itemsInput = {
    create?: XOR<questionsCreateWithoutOrdering_itemsInput, questionsUncheckedCreateWithoutOrdering_itemsInput>
    connectOrCreate?: questionsCreateOrConnectWithoutOrdering_itemsInput
    connect?: questionsWhereUniqueInput
  }

  export type questionsUpdateOneRequiredWithoutOrdering_itemsNestedInput = {
    create?: XOR<questionsCreateWithoutOrdering_itemsInput, questionsUncheckedCreateWithoutOrdering_itemsInput>
    connectOrCreate?: questionsCreateOrConnectWithoutOrdering_itemsInput
    upsert?: questionsUpsertWithoutOrdering_itemsInput
    connect?: questionsWhereUniqueInput
    update?: XOR<XOR<questionsUpdateToOneWithWhereWithoutOrdering_itemsInput, questionsUpdateWithoutOrdering_itemsInput>, questionsUncheckedUpdateWithoutOrdering_itemsInput>
  }

  export type quizzesCreateNestedOneWithoutTeamsInput = {
    create?: XOR<quizzesCreateWithoutTeamsInput, quizzesUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: quizzesCreateOrConnectWithoutTeamsInput
    connect?: quizzesWhereUniqueInput
  }

  export type quizzesUpdateOneRequiredWithoutTeamsNestedInput = {
    create?: XOR<quizzesCreateWithoutTeamsInput, quizzesUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: quizzesCreateOrConnectWithoutTeamsInput
    upsert?: quizzesUpsertWithoutTeamsInput
    connect?: quizzesWhereUniqueInput
    update?: XOR<XOR<quizzesUpdateToOneWithWhereWithoutTeamsInput, quizzesUpdateWithoutTeamsInput>, quizzesUncheckedUpdateWithoutTeamsInput>
  }

  export type usersCreateNestedOneWithoutParticipant_historyInput = {
    create?: XOR<usersCreateWithoutParticipant_historyInput, usersUncheckedCreateWithoutParticipant_historyInput>
    connectOrCreate?: usersCreateOrConnectWithoutParticipant_historyInput
    connect?: usersWhereUniqueInput
  }

  export type quizzesCreateNestedOneWithoutParticipant_historyInput = {
    create?: XOR<quizzesCreateWithoutParticipant_historyInput, quizzesUncheckedCreateWithoutParticipant_historyInput>
    connectOrCreate?: quizzesCreateOrConnectWithoutParticipant_historyInput
    connect?: quizzesWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutParticipant_historyNestedInput = {
    create?: XOR<usersCreateWithoutParticipant_historyInput, usersUncheckedCreateWithoutParticipant_historyInput>
    connectOrCreate?: usersCreateOrConnectWithoutParticipant_historyInput
    upsert?: usersUpsertWithoutParticipant_historyInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutParticipant_historyInput, usersUpdateWithoutParticipant_historyInput>, usersUncheckedUpdateWithoutParticipant_historyInput>
  }

  export type quizzesUpdateOneRequiredWithoutParticipant_historyNestedInput = {
    create?: XOR<quizzesCreateWithoutParticipant_historyInput, quizzesUncheckedCreateWithoutParticipant_historyInput>
    connectOrCreate?: quizzesCreateOrConnectWithoutParticipant_historyInput
    upsert?: quizzesUpsertWithoutParticipant_historyInput
    connect?: quizzesWhereUniqueInput
    update?: XOR<XOR<quizzesUpdateToOneWithWhereWithoutParticipant_historyInput, quizzesUpdateWithoutParticipant_historyInput>, quizzesUncheckedUpdateWithoutParticipant_historyInput>
  }

  export type answersCreateNestedManyWithoutQuestionsInput = {
    create?: XOR<answersCreateWithoutQuestionsInput, answersUncheckedCreateWithoutQuestionsInput> | answersCreateWithoutQuestionsInput[] | answersUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: answersCreateOrConnectWithoutQuestionsInput | answersCreateOrConnectWithoutQuestionsInput[]
    createMany?: answersCreateManyQuestionsInputEnvelope
    connect?: answersWhereUniqueInput | answersWhereUniqueInput[]
  }

  export type optionsCreateNestedManyWithoutQuestionsInput = {
    create?: XOR<optionsCreateWithoutQuestionsInput, optionsUncheckedCreateWithoutQuestionsInput> | optionsCreateWithoutQuestionsInput[] | optionsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: optionsCreateOrConnectWithoutQuestionsInput | optionsCreateOrConnectWithoutQuestionsInput[]
    createMany?: optionsCreateManyQuestionsInputEnvelope
    connect?: optionsWhereUniqueInput | optionsWhereUniqueInput[]
  }

  export type matching_pairsCreateNestedManyWithoutQuestionsInput = {
    create?: XOR<matching_pairsCreateWithoutQuestionsInput, matching_pairsUncheckedCreateWithoutQuestionsInput> | matching_pairsCreateWithoutQuestionsInput[] | matching_pairsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: matching_pairsCreateOrConnectWithoutQuestionsInput | matching_pairsCreateOrConnectWithoutQuestionsInput[]
    createMany?: matching_pairsCreateManyQuestionsInputEnvelope
    connect?: matching_pairsWhereUniqueInput | matching_pairsWhereUniqueInput[]
  }

  export type drag_drop_itemsCreateNestedManyWithoutQuestionsInput = {
    create?: XOR<drag_drop_itemsCreateWithoutQuestionsInput, drag_drop_itemsUncheckedCreateWithoutQuestionsInput> | drag_drop_itemsCreateWithoutQuestionsInput[] | drag_drop_itemsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: drag_drop_itemsCreateOrConnectWithoutQuestionsInput | drag_drop_itemsCreateOrConnectWithoutQuestionsInput[]
    createMany?: drag_drop_itemsCreateManyQuestionsInputEnvelope
    connect?: drag_drop_itemsWhereUniqueInput | drag_drop_itemsWhereUniqueInput[]
  }

  export type ordering_itemsCreateNestedManyWithoutQuestionsInput = {
    create?: XOR<ordering_itemsCreateWithoutQuestionsInput, ordering_itemsUncheckedCreateWithoutQuestionsInput> | ordering_itemsCreateWithoutQuestionsInput[] | ordering_itemsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: ordering_itemsCreateOrConnectWithoutQuestionsInput | ordering_itemsCreateOrConnectWithoutQuestionsInput[]
    createMany?: ordering_itemsCreateManyQuestionsInputEnvelope
    connect?: ordering_itemsWhereUniqueInput | ordering_itemsWhereUniqueInput[]
  }

  export type quizzesCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<quizzesCreateWithoutQuestionsInput, quizzesUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: quizzesCreateOrConnectWithoutQuestionsInput
    connect?: quizzesWhereUniqueInput
  }

  export type answersUncheckedCreateNestedManyWithoutQuestionsInput = {
    create?: XOR<answersCreateWithoutQuestionsInput, answersUncheckedCreateWithoutQuestionsInput> | answersCreateWithoutQuestionsInput[] | answersUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: answersCreateOrConnectWithoutQuestionsInput | answersCreateOrConnectWithoutQuestionsInput[]
    createMany?: answersCreateManyQuestionsInputEnvelope
    connect?: answersWhereUniqueInput | answersWhereUniqueInput[]
  }

  export type optionsUncheckedCreateNestedManyWithoutQuestionsInput = {
    create?: XOR<optionsCreateWithoutQuestionsInput, optionsUncheckedCreateWithoutQuestionsInput> | optionsCreateWithoutQuestionsInput[] | optionsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: optionsCreateOrConnectWithoutQuestionsInput | optionsCreateOrConnectWithoutQuestionsInput[]
    createMany?: optionsCreateManyQuestionsInputEnvelope
    connect?: optionsWhereUniqueInput | optionsWhereUniqueInput[]
  }

  export type matching_pairsUncheckedCreateNestedManyWithoutQuestionsInput = {
    create?: XOR<matching_pairsCreateWithoutQuestionsInput, matching_pairsUncheckedCreateWithoutQuestionsInput> | matching_pairsCreateWithoutQuestionsInput[] | matching_pairsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: matching_pairsCreateOrConnectWithoutQuestionsInput | matching_pairsCreateOrConnectWithoutQuestionsInput[]
    createMany?: matching_pairsCreateManyQuestionsInputEnvelope
    connect?: matching_pairsWhereUniqueInput | matching_pairsWhereUniqueInput[]
  }

  export type drag_drop_itemsUncheckedCreateNestedManyWithoutQuestionsInput = {
    create?: XOR<drag_drop_itemsCreateWithoutQuestionsInput, drag_drop_itemsUncheckedCreateWithoutQuestionsInput> | drag_drop_itemsCreateWithoutQuestionsInput[] | drag_drop_itemsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: drag_drop_itemsCreateOrConnectWithoutQuestionsInput | drag_drop_itemsCreateOrConnectWithoutQuestionsInput[]
    createMany?: drag_drop_itemsCreateManyQuestionsInputEnvelope
    connect?: drag_drop_itemsWhereUniqueInput | drag_drop_itemsWhereUniqueInput[]
  }

  export type ordering_itemsUncheckedCreateNestedManyWithoutQuestionsInput = {
    create?: XOR<ordering_itemsCreateWithoutQuestionsInput, ordering_itemsUncheckedCreateWithoutQuestionsInput> | ordering_itemsCreateWithoutQuestionsInput[] | ordering_itemsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: ordering_itemsCreateOrConnectWithoutQuestionsInput | ordering_itemsCreateOrConnectWithoutQuestionsInput[]
    createMany?: ordering_itemsCreateManyQuestionsInputEnvelope
    connect?: ordering_itemsWhereUniqueInput | ordering_itemsWhereUniqueInput[]
  }

  export type Enumquestions_typeFieldUpdateOperationsInput = {
    set?: $Enums.questions_type
  }

  export type NullableEnumquestions_media_typeFieldUpdateOperationsInput = {
    set?: $Enums.questions_media_type | null
  }

  export type answersUpdateManyWithoutQuestionsNestedInput = {
    create?: XOR<answersCreateWithoutQuestionsInput, answersUncheckedCreateWithoutQuestionsInput> | answersCreateWithoutQuestionsInput[] | answersUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: answersCreateOrConnectWithoutQuestionsInput | answersCreateOrConnectWithoutQuestionsInput[]
    upsert?: answersUpsertWithWhereUniqueWithoutQuestionsInput | answersUpsertWithWhereUniqueWithoutQuestionsInput[]
    createMany?: answersCreateManyQuestionsInputEnvelope
    set?: answersWhereUniqueInput | answersWhereUniqueInput[]
    disconnect?: answersWhereUniqueInput | answersWhereUniqueInput[]
    delete?: answersWhereUniqueInput | answersWhereUniqueInput[]
    connect?: answersWhereUniqueInput | answersWhereUniqueInput[]
    update?: answersUpdateWithWhereUniqueWithoutQuestionsInput | answersUpdateWithWhereUniqueWithoutQuestionsInput[]
    updateMany?: answersUpdateManyWithWhereWithoutQuestionsInput | answersUpdateManyWithWhereWithoutQuestionsInput[]
    deleteMany?: answersScalarWhereInput | answersScalarWhereInput[]
  }

  export type optionsUpdateManyWithoutQuestionsNestedInput = {
    create?: XOR<optionsCreateWithoutQuestionsInput, optionsUncheckedCreateWithoutQuestionsInput> | optionsCreateWithoutQuestionsInput[] | optionsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: optionsCreateOrConnectWithoutQuestionsInput | optionsCreateOrConnectWithoutQuestionsInput[]
    upsert?: optionsUpsertWithWhereUniqueWithoutQuestionsInput | optionsUpsertWithWhereUniqueWithoutQuestionsInput[]
    createMany?: optionsCreateManyQuestionsInputEnvelope
    set?: optionsWhereUniqueInput | optionsWhereUniqueInput[]
    disconnect?: optionsWhereUniqueInput | optionsWhereUniqueInput[]
    delete?: optionsWhereUniqueInput | optionsWhereUniqueInput[]
    connect?: optionsWhereUniqueInput | optionsWhereUniqueInput[]
    update?: optionsUpdateWithWhereUniqueWithoutQuestionsInput | optionsUpdateWithWhereUniqueWithoutQuestionsInput[]
    updateMany?: optionsUpdateManyWithWhereWithoutQuestionsInput | optionsUpdateManyWithWhereWithoutQuestionsInput[]
    deleteMany?: optionsScalarWhereInput | optionsScalarWhereInput[]
  }

  export type matching_pairsUpdateManyWithoutQuestionsNestedInput = {
    create?: XOR<matching_pairsCreateWithoutQuestionsInput, matching_pairsUncheckedCreateWithoutQuestionsInput> | matching_pairsCreateWithoutQuestionsInput[] | matching_pairsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: matching_pairsCreateOrConnectWithoutQuestionsInput | matching_pairsCreateOrConnectWithoutQuestionsInput[]
    upsert?: matching_pairsUpsertWithWhereUniqueWithoutQuestionsInput | matching_pairsUpsertWithWhereUniqueWithoutQuestionsInput[]
    createMany?: matching_pairsCreateManyQuestionsInputEnvelope
    set?: matching_pairsWhereUniqueInput | matching_pairsWhereUniqueInput[]
    disconnect?: matching_pairsWhereUniqueInput | matching_pairsWhereUniqueInput[]
    delete?: matching_pairsWhereUniqueInput | matching_pairsWhereUniqueInput[]
    connect?: matching_pairsWhereUniqueInput | matching_pairsWhereUniqueInput[]
    update?: matching_pairsUpdateWithWhereUniqueWithoutQuestionsInput | matching_pairsUpdateWithWhereUniqueWithoutQuestionsInput[]
    updateMany?: matching_pairsUpdateManyWithWhereWithoutQuestionsInput | matching_pairsUpdateManyWithWhereWithoutQuestionsInput[]
    deleteMany?: matching_pairsScalarWhereInput | matching_pairsScalarWhereInput[]
  }

  export type drag_drop_itemsUpdateManyWithoutQuestionsNestedInput = {
    create?: XOR<drag_drop_itemsCreateWithoutQuestionsInput, drag_drop_itemsUncheckedCreateWithoutQuestionsInput> | drag_drop_itemsCreateWithoutQuestionsInput[] | drag_drop_itemsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: drag_drop_itemsCreateOrConnectWithoutQuestionsInput | drag_drop_itemsCreateOrConnectWithoutQuestionsInput[]
    upsert?: drag_drop_itemsUpsertWithWhereUniqueWithoutQuestionsInput | drag_drop_itemsUpsertWithWhereUniqueWithoutQuestionsInput[]
    createMany?: drag_drop_itemsCreateManyQuestionsInputEnvelope
    set?: drag_drop_itemsWhereUniqueInput | drag_drop_itemsWhereUniqueInput[]
    disconnect?: drag_drop_itemsWhereUniqueInput | drag_drop_itemsWhereUniqueInput[]
    delete?: drag_drop_itemsWhereUniqueInput | drag_drop_itemsWhereUniqueInput[]
    connect?: drag_drop_itemsWhereUniqueInput | drag_drop_itemsWhereUniqueInput[]
    update?: drag_drop_itemsUpdateWithWhereUniqueWithoutQuestionsInput | drag_drop_itemsUpdateWithWhereUniqueWithoutQuestionsInput[]
    updateMany?: drag_drop_itemsUpdateManyWithWhereWithoutQuestionsInput | drag_drop_itemsUpdateManyWithWhereWithoutQuestionsInput[]
    deleteMany?: drag_drop_itemsScalarWhereInput | drag_drop_itemsScalarWhereInput[]
  }

  export type ordering_itemsUpdateManyWithoutQuestionsNestedInput = {
    create?: XOR<ordering_itemsCreateWithoutQuestionsInput, ordering_itemsUncheckedCreateWithoutQuestionsInput> | ordering_itemsCreateWithoutQuestionsInput[] | ordering_itemsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: ordering_itemsCreateOrConnectWithoutQuestionsInput | ordering_itemsCreateOrConnectWithoutQuestionsInput[]
    upsert?: ordering_itemsUpsertWithWhereUniqueWithoutQuestionsInput | ordering_itemsUpsertWithWhereUniqueWithoutQuestionsInput[]
    createMany?: ordering_itemsCreateManyQuestionsInputEnvelope
    set?: ordering_itemsWhereUniqueInput | ordering_itemsWhereUniqueInput[]
    disconnect?: ordering_itemsWhereUniqueInput | ordering_itemsWhereUniqueInput[]
    delete?: ordering_itemsWhereUniqueInput | ordering_itemsWhereUniqueInput[]
    connect?: ordering_itemsWhereUniqueInput | ordering_itemsWhereUniqueInput[]
    update?: ordering_itemsUpdateWithWhereUniqueWithoutQuestionsInput | ordering_itemsUpdateWithWhereUniqueWithoutQuestionsInput[]
    updateMany?: ordering_itemsUpdateManyWithWhereWithoutQuestionsInput | ordering_itemsUpdateManyWithWhereWithoutQuestionsInput[]
    deleteMany?: ordering_itemsScalarWhereInput | ordering_itemsScalarWhereInput[]
  }

  export type quizzesUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<quizzesCreateWithoutQuestionsInput, quizzesUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: quizzesCreateOrConnectWithoutQuestionsInput
    upsert?: quizzesUpsertWithoutQuestionsInput
    connect?: quizzesWhereUniqueInput
    update?: XOR<XOR<quizzesUpdateToOneWithWhereWithoutQuestionsInput, quizzesUpdateWithoutQuestionsInput>, quizzesUncheckedUpdateWithoutQuestionsInput>
  }

  export type answersUncheckedUpdateManyWithoutQuestionsNestedInput = {
    create?: XOR<answersCreateWithoutQuestionsInput, answersUncheckedCreateWithoutQuestionsInput> | answersCreateWithoutQuestionsInput[] | answersUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: answersCreateOrConnectWithoutQuestionsInput | answersCreateOrConnectWithoutQuestionsInput[]
    upsert?: answersUpsertWithWhereUniqueWithoutQuestionsInput | answersUpsertWithWhereUniqueWithoutQuestionsInput[]
    createMany?: answersCreateManyQuestionsInputEnvelope
    set?: answersWhereUniqueInput | answersWhereUniqueInput[]
    disconnect?: answersWhereUniqueInput | answersWhereUniqueInput[]
    delete?: answersWhereUniqueInput | answersWhereUniqueInput[]
    connect?: answersWhereUniqueInput | answersWhereUniqueInput[]
    update?: answersUpdateWithWhereUniqueWithoutQuestionsInput | answersUpdateWithWhereUniqueWithoutQuestionsInput[]
    updateMany?: answersUpdateManyWithWhereWithoutQuestionsInput | answersUpdateManyWithWhereWithoutQuestionsInput[]
    deleteMany?: answersScalarWhereInput | answersScalarWhereInput[]
  }

  export type optionsUncheckedUpdateManyWithoutQuestionsNestedInput = {
    create?: XOR<optionsCreateWithoutQuestionsInput, optionsUncheckedCreateWithoutQuestionsInput> | optionsCreateWithoutQuestionsInput[] | optionsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: optionsCreateOrConnectWithoutQuestionsInput | optionsCreateOrConnectWithoutQuestionsInput[]
    upsert?: optionsUpsertWithWhereUniqueWithoutQuestionsInput | optionsUpsertWithWhereUniqueWithoutQuestionsInput[]
    createMany?: optionsCreateManyQuestionsInputEnvelope
    set?: optionsWhereUniqueInput | optionsWhereUniqueInput[]
    disconnect?: optionsWhereUniqueInput | optionsWhereUniqueInput[]
    delete?: optionsWhereUniqueInput | optionsWhereUniqueInput[]
    connect?: optionsWhereUniqueInput | optionsWhereUniqueInput[]
    update?: optionsUpdateWithWhereUniqueWithoutQuestionsInput | optionsUpdateWithWhereUniqueWithoutQuestionsInput[]
    updateMany?: optionsUpdateManyWithWhereWithoutQuestionsInput | optionsUpdateManyWithWhereWithoutQuestionsInput[]
    deleteMany?: optionsScalarWhereInput | optionsScalarWhereInput[]
  }

  export type matching_pairsUncheckedUpdateManyWithoutQuestionsNestedInput = {
    create?: XOR<matching_pairsCreateWithoutQuestionsInput, matching_pairsUncheckedCreateWithoutQuestionsInput> | matching_pairsCreateWithoutQuestionsInput[] | matching_pairsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: matching_pairsCreateOrConnectWithoutQuestionsInput | matching_pairsCreateOrConnectWithoutQuestionsInput[]
    upsert?: matching_pairsUpsertWithWhereUniqueWithoutQuestionsInput | matching_pairsUpsertWithWhereUniqueWithoutQuestionsInput[]
    createMany?: matching_pairsCreateManyQuestionsInputEnvelope
    set?: matching_pairsWhereUniqueInput | matching_pairsWhereUniqueInput[]
    disconnect?: matching_pairsWhereUniqueInput | matching_pairsWhereUniqueInput[]
    delete?: matching_pairsWhereUniqueInput | matching_pairsWhereUniqueInput[]
    connect?: matching_pairsWhereUniqueInput | matching_pairsWhereUniqueInput[]
    update?: matching_pairsUpdateWithWhereUniqueWithoutQuestionsInput | matching_pairsUpdateWithWhereUniqueWithoutQuestionsInput[]
    updateMany?: matching_pairsUpdateManyWithWhereWithoutQuestionsInput | matching_pairsUpdateManyWithWhereWithoutQuestionsInput[]
    deleteMany?: matching_pairsScalarWhereInput | matching_pairsScalarWhereInput[]
  }

  export type drag_drop_itemsUncheckedUpdateManyWithoutQuestionsNestedInput = {
    create?: XOR<drag_drop_itemsCreateWithoutQuestionsInput, drag_drop_itemsUncheckedCreateWithoutQuestionsInput> | drag_drop_itemsCreateWithoutQuestionsInput[] | drag_drop_itemsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: drag_drop_itemsCreateOrConnectWithoutQuestionsInput | drag_drop_itemsCreateOrConnectWithoutQuestionsInput[]
    upsert?: drag_drop_itemsUpsertWithWhereUniqueWithoutQuestionsInput | drag_drop_itemsUpsertWithWhereUniqueWithoutQuestionsInput[]
    createMany?: drag_drop_itemsCreateManyQuestionsInputEnvelope
    set?: drag_drop_itemsWhereUniqueInput | drag_drop_itemsWhereUniqueInput[]
    disconnect?: drag_drop_itemsWhereUniqueInput | drag_drop_itemsWhereUniqueInput[]
    delete?: drag_drop_itemsWhereUniqueInput | drag_drop_itemsWhereUniqueInput[]
    connect?: drag_drop_itemsWhereUniqueInput | drag_drop_itemsWhereUniqueInput[]
    update?: drag_drop_itemsUpdateWithWhereUniqueWithoutQuestionsInput | drag_drop_itemsUpdateWithWhereUniqueWithoutQuestionsInput[]
    updateMany?: drag_drop_itemsUpdateManyWithWhereWithoutQuestionsInput | drag_drop_itemsUpdateManyWithWhereWithoutQuestionsInput[]
    deleteMany?: drag_drop_itemsScalarWhereInput | drag_drop_itemsScalarWhereInput[]
  }

  export type ordering_itemsUncheckedUpdateManyWithoutQuestionsNestedInput = {
    create?: XOR<ordering_itemsCreateWithoutQuestionsInput, ordering_itemsUncheckedCreateWithoutQuestionsInput> | ordering_itemsCreateWithoutQuestionsInput[] | ordering_itemsUncheckedCreateWithoutQuestionsInput[]
    connectOrCreate?: ordering_itemsCreateOrConnectWithoutQuestionsInput | ordering_itemsCreateOrConnectWithoutQuestionsInput[]
    upsert?: ordering_itemsUpsertWithWhereUniqueWithoutQuestionsInput | ordering_itemsUpsertWithWhereUniqueWithoutQuestionsInput[]
    createMany?: ordering_itemsCreateManyQuestionsInputEnvelope
    set?: ordering_itemsWhereUniqueInput | ordering_itemsWhereUniqueInput[]
    disconnect?: ordering_itemsWhereUniqueInput | ordering_itemsWhereUniqueInput[]
    delete?: ordering_itemsWhereUniqueInput | ordering_itemsWhereUniqueInput[]
    connect?: ordering_itemsWhereUniqueInput | ordering_itemsWhereUniqueInput[]
    update?: ordering_itemsUpdateWithWhereUniqueWithoutQuestionsInput | ordering_itemsUpdateWithWhereUniqueWithoutQuestionsInput[]
    updateMany?: ordering_itemsUpdateManyWithWhereWithoutQuestionsInput | ordering_itemsUpdateManyWithWhereWithoutQuestionsInput[]
    deleteMany?: ordering_itemsScalarWhereInput | ordering_itemsScalarWhereInput[]
  }

  export type quizzesCreateNestedOneWithoutQuiz_sessionsInput = {
    create?: XOR<quizzesCreateWithoutQuiz_sessionsInput, quizzesUncheckedCreateWithoutQuiz_sessionsInput>
    connectOrCreate?: quizzesCreateOrConnectWithoutQuiz_sessionsInput
    connect?: quizzesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutQuiz_sessionsInput = {
    create?: XOR<usersCreateWithoutQuiz_sessionsInput, usersUncheckedCreateWithoutQuiz_sessionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutQuiz_sessionsInput
    connect?: usersWhereUniqueInput
  }

  export type session_participantsCreateNestedManyWithoutQuiz_sessionsInput = {
    create?: XOR<session_participantsCreateWithoutQuiz_sessionsInput, session_participantsUncheckedCreateWithoutQuiz_sessionsInput> | session_participantsCreateWithoutQuiz_sessionsInput[] | session_participantsUncheckedCreateWithoutQuiz_sessionsInput[]
    connectOrCreate?: session_participantsCreateOrConnectWithoutQuiz_sessionsInput | session_participantsCreateOrConnectWithoutQuiz_sessionsInput[]
    createMany?: session_participantsCreateManyQuiz_sessionsInputEnvelope
    connect?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
  }

  export type session_participantsUncheckedCreateNestedManyWithoutQuiz_sessionsInput = {
    create?: XOR<session_participantsCreateWithoutQuiz_sessionsInput, session_participantsUncheckedCreateWithoutQuiz_sessionsInput> | session_participantsCreateWithoutQuiz_sessionsInput[] | session_participantsUncheckedCreateWithoutQuiz_sessionsInput[]
    connectOrCreate?: session_participantsCreateOrConnectWithoutQuiz_sessionsInput | session_participantsCreateOrConnectWithoutQuiz_sessionsInput[]
    createMany?: session_participantsCreateManyQuiz_sessionsInputEnvelope
    connect?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
  }

  export type NullableEnumquiz_sessions_statusFieldUpdateOperationsInput = {
    set?: $Enums.quiz_sessions_status | null
  }

  export type quizzesUpdateOneRequiredWithoutQuiz_sessionsNestedInput = {
    create?: XOR<quizzesCreateWithoutQuiz_sessionsInput, quizzesUncheckedCreateWithoutQuiz_sessionsInput>
    connectOrCreate?: quizzesCreateOrConnectWithoutQuiz_sessionsInput
    upsert?: quizzesUpsertWithoutQuiz_sessionsInput
    connect?: quizzesWhereUniqueInput
    update?: XOR<XOR<quizzesUpdateToOneWithWhereWithoutQuiz_sessionsInput, quizzesUpdateWithoutQuiz_sessionsInput>, quizzesUncheckedUpdateWithoutQuiz_sessionsInput>
  }

  export type usersUpdateOneRequiredWithoutQuiz_sessionsNestedInput = {
    create?: XOR<usersCreateWithoutQuiz_sessionsInput, usersUncheckedCreateWithoutQuiz_sessionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutQuiz_sessionsInput
    upsert?: usersUpsertWithoutQuiz_sessionsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutQuiz_sessionsInput, usersUpdateWithoutQuiz_sessionsInput>, usersUncheckedUpdateWithoutQuiz_sessionsInput>
  }

  export type session_participantsUpdateManyWithoutQuiz_sessionsNestedInput = {
    create?: XOR<session_participantsCreateWithoutQuiz_sessionsInput, session_participantsUncheckedCreateWithoutQuiz_sessionsInput> | session_participantsCreateWithoutQuiz_sessionsInput[] | session_participantsUncheckedCreateWithoutQuiz_sessionsInput[]
    connectOrCreate?: session_participantsCreateOrConnectWithoutQuiz_sessionsInput | session_participantsCreateOrConnectWithoutQuiz_sessionsInput[]
    upsert?: session_participantsUpsertWithWhereUniqueWithoutQuiz_sessionsInput | session_participantsUpsertWithWhereUniqueWithoutQuiz_sessionsInput[]
    createMany?: session_participantsCreateManyQuiz_sessionsInputEnvelope
    set?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    disconnect?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    delete?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    connect?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    update?: session_participantsUpdateWithWhereUniqueWithoutQuiz_sessionsInput | session_participantsUpdateWithWhereUniqueWithoutQuiz_sessionsInput[]
    updateMany?: session_participantsUpdateManyWithWhereWithoutQuiz_sessionsInput | session_participantsUpdateManyWithWhereWithoutQuiz_sessionsInput[]
    deleteMany?: session_participantsScalarWhereInput | session_participantsScalarWhereInput[]
  }

  export type session_participantsUncheckedUpdateManyWithoutQuiz_sessionsNestedInput = {
    create?: XOR<session_participantsCreateWithoutQuiz_sessionsInput, session_participantsUncheckedCreateWithoutQuiz_sessionsInput> | session_participantsCreateWithoutQuiz_sessionsInput[] | session_participantsUncheckedCreateWithoutQuiz_sessionsInput[]
    connectOrCreate?: session_participantsCreateOrConnectWithoutQuiz_sessionsInput | session_participantsCreateOrConnectWithoutQuiz_sessionsInput[]
    upsert?: session_participantsUpsertWithWhereUniqueWithoutQuiz_sessionsInput | session_participantsUpsertWithWhereUniqueWithoutQuiz_sessionsInput[]
    createMany?: session_participantsCreateManyQuiz_sessionsInputEnvelope
    set?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    disconnect?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    delete?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    connect?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    update?: session_participantsUpdateWithWhereUniqueWithoutQuiz_sessionsInput | session_participantsUpdateWithWhereUniqueWithoutQuiz_sessionsInput[]
    updateMany?: session_participantsUpdateManyWithWhereWithoutQuiz_sessionsInput | session_participantsUpdateManyWithWhereWithoutQuiz_sessionsInput[]
    deleteMany?: session_participantsScalarWhereInput | session_participantsScalarWhereInput[]
  }

  export type participant_historyCreateNestedManyWithoutQuizzesInput = {
    create?: XOR<participant_historyCreateWithoutQuizzesInput, participant_historyUncheckedCreateWithoutQuizzesInput> | participant_historyCreateWithoutQuizzesInput[] | participant_historyUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: participant_historyCreateOrConnectWithoutQuizzesInput | participant_historyCreateOrConnectWithoutQuizzesInput[]
    createMany?: participant_historyCreateManyQuizzesInputEnvelope
    connect?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
  }

  export type questionsCreateNestedManyWithoutQuizzesInput = {
    create?: XOR<questionsCreateWithoutQuizzesInput, questionsUncheckedCreateWithoutQuizzesInput> | questionsCreateWithoutQuizzesInput[] | questionsUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: questionsCreateOrConnectWithoutQuizzesInput | questionsCreateOrConnectWithoutQuizzesInput[]
    createMany?: questionsCreateManyQuizzesInputEnvelope
    connect?: questionsWhereUniqueInput | questionsWhereUniqueInput[]
  }

  export type quiz_sessionsCreateNestedManyWithoutQuizzesInput = {
    create?: XOR<quiz_sessionsCreateWithoutQuizzesInput, quiz_sessionsUncheckedCreateWithoutQuizzesInput> | quiz_sessionsCreateWithoutQuizzesInput[] | quiz_sessionsUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: quiz_sessionsCreateOrConnectWithoutQuizzesInput | quiz_sessionsCreateOrConnectWithoutQuizzesInput[]
    createMany?: quiz_sessionsCreateManyQuizzesInputEnvelope
    connect?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
  }

  export type teamsCreateNestedManyWithoutQuizzesInput = {
    create?: XOR<teamsCreateWithoutQuizzesInput, teamsUncheckedCreateWithoutQuizzesInput> | teamsCreateWithoutQuizzesInput[] | teamsUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: teamsCreateOrConnectWithoutQuizzesInput | teamsCreateOrConnectWithoutQuizzesInput[]
    createMany?: teamsCreateManyQuizzesInputEnvelope
    connect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutQuizzesInput = {
    create?: XOR<usersCreateWithoutQuizzesInput, usersUncheckedCreateWithoutQuizzesInput>
    connectOrCreate?: usersCreateOrConnectWithoutQuizzesInput
    connect?: usersWhereUniqueInput
  }

  export type participant_historyUncheckedCreateNestedManyWithoutQuizzesInput = {
    create?: XOR<participant_historyCreateWithoutQuizzesInput, participant_historyUncheckedCreateWithoutQuizzesInput> | participant_historyCreateWithoutQuizzesInput[] | participant_historyUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: participant_historyCreateOrConnectWithoutQuizzesInput | participant_historyCreateOrConnectWithoutQuizzesInput[]
    createMany?: participant_historyCreateManyQuizzesInputEnvelope
    connect?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
  }

  export type questionsUncheckedCreateNestedManyWithoutQuizzesInput = {
    create?: XOR<questionsCreateWithoutQuizzesInput, questionsUncheckedCreateWithoutQuizzesInput> | questionsCreateWithoutQuizzesInput[] | questionsUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: questionsCreateOrConnectWithoutQuizzesInput | questionsCreateOrConnectWithoutQuizzesInput[]
    createMany?: questionsCreateManyQuizzesInputEnvelope
    connect?: questionsWhereUniqueInput | questionsWhereUniqueInput[]
  }

  export type quiz_sessionsUncheckedCreateNestedManyWithoutQuizzesInput = {
    create?: XOR<quiz_sessionsCreateWithoutQuizzesInput, quiz_sessionsUncheckedCreateWithoutQuizzesInput> | quiz_sessionsCreateWithoutQuizzesInput[] | quiz_sessionsUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: quiz_sessionsCreateOrConnectWithoutQuizzesInput | quiz_sessionsCreateOrConnectWithoutQuizzesInput[]
    createMany?: quiz_sessionsCreateManyQuizzesInputEnvelope
    connect?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
  }

  export type teamsUncheckedCreateNestedManyWithoutQuizzesInput = {
    create?: XOR<teamsCreateWithoutQuizzesInput, teamsUncheckedCreateWithoutQuizzesInput> | teamsCreateWithoutQuizzesInput[] | teamsUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: teamsCreateOrConnectWithoutQuizzesInput | teamsCreateOrConnectWithoutQuizzesInput[]
    createMany?: teamsCreateManyQuizzesInputEnvelope
    connect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
  }

  export type NullableEnumquizzes_statusFieldUpdateOperationsInput = {
    set?: $Enums.quizzes_status | null
  }

  export type participant_historyUpdateManyWithoutQuizzesNestedInput = {
    create?: XOR<participant_historyCreateWithoutQuizzesInput, participant_historyUncheckedCreateWithoutQuizzesInput> | participant_historyCreateWithoutQuizzesInput[] | participant_historyUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: participant_historyCreateOrConnectWithoutQuizzesInput | participant_historyCreateOrConnectWithoutQuizzesInput[]
    upsert?: participant_historyUpsertWithWhereUniqueWithoutQuizzesInput | participant_historyUpsertWithWhereUniqueWithoutQuizzesInput[]
    createMany?: participant_historyCreateManyQuizzesInputEnvelope
    set?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    disconnect?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    delete?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    connect?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    update?: participant_historyUpdateWithWhereUniqueWithoutQuizzesInput | participant_historyUpdateWithWhereUniqueWithoutQuizzesInput[]
    updateMany?: participant_historyUpdateManyWithWhereWithoutQuizzesInput | participant_historyUpdateManyWithWhereWithoutQuizzesInput[]
    deleteMany?: participant_historyScalarWhereInput | participant_historyScalarWhereInput[]
  }

  export type questionsUpdateManyWithoutQuizzesNestedInput = {
    create?: XOR<questionsCreateWithoutQuizzesInput, questionsUncheckedCreateWithoutQuizzesInput> | questionsCreateWithoutQuizzesInput[] | questionsUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: questionsCreateOrConnectWithoutQuizzesInput | questionsCreateOrConnectWithoutQuizzesInput[]
    upsert?: questionsUpsertWithWhereUniqueWithoutQuizzesInput | questionsUpsertWithWhereUniqueWithoutQuizzesInput[]
    createMany?: questionsCreateManyQuizzesInputEnvelope
    set?: questionsWhereUniqueInput | questionsWhereUniqueInput[]
    disconnect?: questionsWhereUniqueInput | questionsWhereUniqueInput[]
    delete?: questionsWhereUniqueInput | questionsWhereUniqueInput[]
    connect?: questionsWhereUniqueInput | questionsWhereUniqueInput[]
    update?: questionsUpdateWithWhereUniqueWithoutQuizzesInput | questionsUpdateWithWhereUniqueWithoutQuizzesInput[]
    updateMany?: questionsUpdateManyWithWhereWithoutQuizzesInput | questionsUpdateManyWithWhereWithoutQuizzesInput[]
    deleteMany?: questionsScalarWhereInput | questionsScalarWhereInput[]
  }

  export type quiz_sessionsUpdateManyWithoutQuizzesNestedInput = {
    create?: XOR<quiz_sessionsCreateWithoutQuizzesInput, quiz_sessionsUncheckedCreateWithoutQuizzesInput> | quiz_sessionsCreateWithoutQuizzesInput[] | quiz_sessionsUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: quiz_sessionsCreateOrConnectWithoutQuizzesInput | quiz_sessionsCreateOrConnectWithoutQuizzesInput[]
    upsert?: quiz_sessionsUpsertWithWhereUniqueWithoutQuizzesInput | quiz_sessionsUpsertWithWhereUniqueWithoutQuizzesInput[]
    createMany?: quiz_sessionsCreateManyQuizzesInputEnvelope
    set?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    disconnect?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    delete?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    connect?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    update?: quiz_sessionsUpdateWithWhereUniqueWithoutQuizzesInput | quiz_sessionsUpdateWithWhereUniqueWithoutQuizzesInput[]
    updateMany?: quiz_sessionsUpdateManyWithWhereWithoutQuizzesInput | quiz_sessionsUpdateManyWithWhereWithoutQuizzesInput[]
    deleteMany?: quiz_sessionsScalarWhereInput | quiz_sessionsScalarWhereInput[]
  }

  export type teamsUpdateManyWithoutQuizzesNestedInput = {
    create?: XOR<teamsCreateWithoutQuizzesInput, teamsUncheckedCreateWithoutQuizzesInput> | teamsCreateWithoutQuizzesInput[] | teamsUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: teamsCreateOrConnectWithoutQuizzesInput | teamsCreateOrConnectWithoutQuizzesInput[]
    upsert?: teamsUpsertWithWhereUniqueWithoutQuizzesInput | teamsUpsertWithWhereUniqueWithoutQuizzesInput[]
    createMany?: teamsCreateManyQuizzesInputEnvelope
    set?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    disconnect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    delete?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    connect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    update?: teamsUpdateWithWhereUniqueWithoutQuizzesInput | teamsUpdateWithWhereUniqueWithoutQuizzesInput[]
    updateMany?: teamsUpdateManyWithWhereWithoutQuizzesInput | teamsUpdateManyWithWhereWithoutQuizzesInput[]
    deleteMany?: teamsScalarWhereInput | teamsScalarWhereInput[]
  }

  export type usersUpdateOneRequiredWithoutQuizzesNestedInput = {
    create?: XOR<usersCreateWithoutQuizzesInput, usersUncheckedCreateWithoutQuizzesInput>
    connectOrCreate?: usersCreateOrConnectWithoutQuizzesInput
    upsert?: usersUpsertWithoutQuizzesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutQuizzesInput, usersUpdateWithoutQuizzesInput>, usersUncheckedUpdateWithoutQuizzesInput>
  }

  export type participant_historyUncheckedUpdateManyWithoutQuizzesNestedInput = {
    create?: XOR<participant_historyCreateWithoutQuizzesInput, participant_historyUncheckedCreateWithoutQuizzesInput> | participant_historyCreateWithoutQuizzesInput[] | participant_historyUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: participant_historyCreateOrConnectWithoutQuizzesInput | participant_historyCreateOrConnectWithoutQuizzesInput[]
    upsert?: participant_historyUpsertWithWhereUniqueWithoutQuizzesInput | participant_historyUpsertWithWhereUniqueWithoutQuizzesInput[]
    createMany?: participant_historyCreateManyQuizzesInputEnvelope
    set?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    disconnect?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    delete?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    connect?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    update?: participant_historyUpdateWithWhereUniqueWithoutQuizzesInput | participant_historyUpdateWithWhereUniqueWithoutQuizzesInput[]
    updateMany?: participant_historyUpdateManyWithWhereWithoutQuizzesInput | participant_historyUpdateManyWithWhereWithoutQuizzesInput[]
    deleteMany?: participant_historyScalarWhereInput | participant_historyScalarWhereInput[]
  }

  export type questionsUncheckedUpdateManyWithoutQuizzesNestedInput = {
    create?: XOR<questionsCreateWithoutQuizzesInput, questionsUncheckedCreateWithoutQuizzesInput> | questionsCreateWithoutQuizzesInput[] | questionsUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: questionsCreateOrConnectWithoutQuizzesInput | questionsCreateOrConnectWithoutQuizzesInput[]
    upsert?: questionsUpsertWithWhereUniqueWithoutQuizzesInput | questionsUpsertWithWhereUniqueWithoutQuizzesInput[]
    createMany?: questionsCreateManyQuizzesInputEnvelope
    set?: questionsWhereUniqueInput | questionsWhereUniqueInput[]
    disconnect?: questionsWhereUniqueInput | questionsWhereUniqueInput[]
    delete?: questionsWhereUniqueInput | questionsWhereUniqueInput[]
    connect?: questionsWhereUniqueInput | questionsWhereUniqueInput[]
    update?: questionsUpdateWithWhereUniqueWithoutQuizzesInput | questionsUpdateWithWhereUniqueWithoutQuizzesInput[]
    updateMany?: questionsUpdateManyWithWhereWithoutQuizzesInput | questionsUpdateManyWithWhereWithoutQuizzesInput[]
    deleteMany?: questionsScalarWhereInput | questionsScalarWhereInput[]
  }

  export type quiz_sessionsUncheckedUpdateManyWithoutQuizzesNestedInput = {
    create?: XOR<quiz_sessionsCreateWithoutQuizzesInput, quiz_sessionsUncheckedCreateWithoutQuizzesInput> | quiz_sessionsCreateWithoutQuizzesInput[] | quiz_sessionsUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: quiz_sessionsCreateOrConnectWithoutQuizzesInput | quiz_sessionsCreateOrConnectWithoutQuizzesInput[]
    upsert?: quiz_sessionsUpsertWithWhereUniqueWithoutQuizzesInput | quiz_sessionsUpsertWithWhereUniqueWithoutQuizzesInput[]
    createMany?: quiz_sessionsCreateManyQuizzesInputEnvelope
    set?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    disconnect?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    delete?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    connect?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    update?: quiz_sessionsUpdateWithWhereUniqueWithoutQuizzesInput | quiz_sessionsUpdateWithWhereUniqueWithoutQuizzesInput[]
    updateMany?: quiz_sessionsUpdateManyWithWhereWithoutQuizzesInput | quiz_sessionsUpdateManyWithWhereWithoutQuizzesInput[]
    deleteMany?: quiz_sessionsScalarWhereInput | quiz_sessionsScalarWhereInput[]
  }

  export type teamsUncheckedUpdateManyWithoutQuizzesNestedInput = {
    create?: XOR<teamsCreateWithoutQuizzesInput, teamsUncheckedCreateWithoutQuizzesInput> | teamsCreateWithoutQuizzesInput[] | teamsUncheckedCreateWithoutQuizzesInput[]
    connectOrCreate?: teamsCreateOrConnectWithoutQuizzesInput | teamsCreateOrConnectWithoutQuizzesInput[]
    upsert?: teamsUpsertWithWhereUniqueWithoutQuizzesInput | teamsUpsertWithWhereUniqueWithoutQuizzesInput[]
    createMany?: teamsCreateManyQuizzesInputEnvelope
    set?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    disconnect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    delete?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    connect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    update?: teamsUpdateWithWhereUniqueWithoutQuizzesInput | teamsUpdateWithWhereUniqueWithoutQuizzesInput[]
    updateMany?: teamsUpdateManyWithWhereWithoutQuizzesInput | teamsUpdateManyWithWhereWithoutQuizzesInput[]
    deleteMany?: teamsScalarWhereInput | teamsScalarWhereInput[]
  }

  export type answersCreateNestedManyWithoutSession_participantsInput = {
    create?: XOR<answersCreateWithoutSession_participantsInput, answersUncheckedCreateWithoutSession_participantsInput> | answersCreateWithoutSession_participantsInput[] | answersUncheckedCreateWithoutSession_participantsInput[]
    connectOrCreate?: answersCreateOrConnectWithoutSession_participantsInput | answersCreateOrConnectWithoutSession_participantsInput[]
    createMany?: answersCreateManySession_participantsInputEnvelope
    connect?: answersWhereUniqueInput | answersWhereUniqueInput[]
  }

  export type quiz_sessionsCreateNestedOneWithoutSession_participantsInput = {
    create?: XOR<quiz_sessionsCreateWithoutSession_participantsInput, quiz_sessionsUncheckedCreateWithoutSession_participantsInput>
    connectOrCreate?: quiz_sessionsCreateOrConnectWithoutSession_participantsInput
    connect?: quiz_sessionsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutSession_participantsInput = {
    create?: XOR<usersCreateWithoutSession_participantsInput, usersUncheckedCreateWithoutSession_participantsInput>
    connectOrCreate?: usersCreateOrConnectWithoutSession_participantsInput
    connect?: usersWhereUniqueInput
  }

  export type answersUncheckedCreateNestedManyWithoutSession_participantsInput = {
    create?: XOR<answersCreateWithoutSession_participantsInput, answersUncheckedCreateWithoutSession_participantsInput> | answersCreateWithoutSession_participantsInput[] | answersUncheckedCreateWithoutSession_participantsInput[]
    connectOrCreate?: answersCreateOrConnectWithoutSession_participantsInput | answersCreateOrConnectWithoutSession_participantsInput[]
    createMany?: answersCreateManySession_participantsInputEnvelope
    connect?: answersWhereUniqueInput | answersWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type answersUpdateManyWithoutSession_participantsNestedInput = {
    create?: XOR<answersCreateWithoutSession_participantsInput, answersUncheckedCreateWithoutSession_participantsInput> | answersCreateWithoutSession_participantsInput[] | answersUncheckedCreateWithoutSession_participantsInput[]
    connectOrCreate?: answersCreateOrConnectWithoutSession_participantsInput | answersCreateOrConnectWithoutSession_participantsInput[]
    upsert?: answersUpsertWithWhereUniqueWithoutSession_participantsInput | answersUpsertWithWhereUniqueWithoutSession_participantsInput[]
    createMany?: answersCreateManySession_participantsInputEnvelope
    set?: answersWhereUniqueInput | answersWhereUniqueInput[]
    disconnect?: answersWhereUniqueInput | answersWhereUniqueInput[]
    delete?: answersWhereUniqueInput | answersWhereUniqueInput[]
    connect?: answersWhereUniqueInput | answersWhereUniqueInput[]
    update?: answersUpdateWithWhereUniqueWithoutSession_participantsInput | answersUpdateWithWhereUniqueWithoutSession_participantsInput[]
    updateMany?: answersUpdateManyWithWhereWithoutSession_participantsInput | answersUpdateManyWithWhereWithoutSession_participantsInput[]
    deleteMany?: answersScalarWhereInput | answersScalarWhereInput[]
  }

  export type quiz_sessionsUpdateOneRequiredWithoutSession_participantsNestedInput = {
    create?: XOR<quiz_sessionsCreateWithoutSession_participantsInput, quiz_sessionsUncheckedCreateWithoutSession_participantsInput>
    connectOrCreate?: quiz_sessionsCreateOrConnectWithoutSession_participantsInput
    upsert?: quiz_sessionsUpsertWithoutSession_participantsInput
    connect?: quiz_sessionsWhereUniqueInput
    update?: XOR<XOR<quiz_sessionsUpdateToOneWithWhereWithoutSession_participantsInput, quiz_sessionsUpdateWithoutSession_participantsInput>, quiz_sessionsUncheckedUpdateWithoutSession_participantsInput>
  }

  export type usersUpdateOneRequiredWithoutSession_participantsNestedInput = {
    create?: XOR<usersCreateWithoutSession_participantsInput, usersUncheckedCreateWithoutSession_participantsInput>
    connectOrCreate?: usersCreateOrConnectWithoutSession_participantsInput
    upsert?: usersUpsertWithoutSession_participantsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutSession_participantsInput, usersUpdateWithoutSession_participantsInput>, usersUncheckedUpdateWithoutSession_participantsInput>
  }

  export type answersUncheckedUpdateManyWithoutSession_participantsNestedInput = {
    create?: XOR<answersCreateWithoutSession_participantsInput, answersUncheckedCreateWithoutSession_participantsInput> | answersCreateWithoutSession_participantsInput[] | answersUncheckedCreateWithoutSession_participantsInput[]
    connectOrCreate?: answersCreateOrConnectWithoutSession_participantsInput | answersCreateOrConnectWithoutSession_participantsInput[]
    upsert?: answersUpsertWithWhereUniqueWithoutSession_participantsInput | answersUpsertWithWhereUniqueWithoutSession_participantsInput[]
    createMany?: answersCreateManySession_participantsInputEnvelope
    set?: answersWhereUniqueInput | answersWhereUniqueInput[]
    disconnect?: answersWhereUniqueInput | answersWhereUniqueInput[]
    delete?: answersWhereUniqueInput | answersWhereUniqueInput[]
    connect?: answersWhereUniqueInput | answersWhereUniqueInput[]
    update?: answersUpdateWithWhereUniqueWithoutSession_participantsInput | answersUpdateWithWhereUniqueWithoutSession_participantsInput[]
    updateMany?: answersUpdateManyWithWhereWithoutSession_participantsInput | answersUpdateManyWithWhereWithoutSession_participantsInput[]
    deleteMany?: answersScalarWhereInput | answersScalarWhereInput[]
  }

  export type participant_historyCreateNestedManyWithoutUsersInput = {
    create?: XOR<participant_historyCreateWithoutUsersInput, participant_historyUncheckedCreateWithoutUsersInput> | participant_historyCreateWithoutUsersInput[] | participant_historyUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: participant_historyCreateOrConnectWithoutUsersInput | participant_historyCreateOrConnectWithoutUsersInput[]
    createMany?: participant_historyCreateManyUsersInputEnvelope
    connect?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
  }

  export type quiz_sessionsCreateNestedManyWithoutUsersInput = {
    create?: XOR<quiz_sessionsCreateWithoutUsersInput, quiz_sessionsUncheckedCreateWithoutUsersInput> | quiz_sessionsCreateWithoutUsersInput[] | quiz_sessionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: quiz_sessionsCreateOrConnectWithoutUsersInput | quiz_sessionsCreateOrConnectWithoutUsersInput[]
    createMany?: quiz_sessionsCreateManyUsersInputEnvelope
    connect?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
  }

  export type quizzesCreateNestedManyWithoutUsersInput = {
    create?: XOR<quizzesCreateWithoutUsersInput, quizzesUncheckedCreateWithoutUsersInput> | quizzesCreateWithoutUsersInput[] | quizzesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: quizzesCreateOrConnectWithoutUsersInput | quizzesCreateOrConnectWithoutUsersInput[]
    createMany?: quizzesCreateManyUsersInputEnvelope
    connect?: quizzesWhereUniqueInput | quizzesWhereUniqueInput[]
  }

  export type session_participantsCreateNestedManyWithoutUsersInput = {
    create?: XOR<session_participantsCreateWithoutUsersInput, session_participantsUncheckedCreateWithoutUsersInput> | session_participantsCreateWithoutUsersInput[] | session_participantsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: session_participantsCreateOrConnectWithoutUsersInput | session_participantsCreateOrConnectWithoutUsersInput[]
    createMany?: session_participantsCreateManyUsersInputEnvelope
    connect?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
  }

  export type participant_historyUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<participant_historyCreateWithoutUsersInput, participant_historyUncheckedCreateWithoutUsersInput> | participant_historyCreateWithoutUsersInput[] | participant_historyUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: participant_historyCreateOrConnectWithoutUsersInput | participant_historyCreateOrConnectWithoutUsersInput[]
    createMany?: participant_historyCreateManyUsersInputEnvelope
    connect?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
  }

  export type quiz_sessionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<quiz_sessionsCreateWithoutUsersInput, quiz_sessionsUncheckedCreateWithoutUsersInput> | quiz_sessionsCreateWithoutUsersInput[] | quiz_sessionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: quiz_sessionsCreateOrConnectWithoutUsersInput | quiz_sessionsCreateOrConnectWithoutUsersInput[]
    createMany?: quiz_sessionsCreateManyUsersInputEnvelope
    connect?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
  }

  export type quizzesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<quizzesCreateWithoutUsersInput, quizzesUncheckedCreateWithoutUsersInput> | quizzesCreateWithoutUsersInput[] | quizzesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: quizzesCreateOrConnectWithoutUsersInput | quizzesCreateOrConnectWithoutUsersInput[]
    createMany?: quizzesCreateManyUsersInputEnvelope
    connect?: quizzesWhereUniqueInput | quizzesWhereUniqueInput[]
  }

  export type session_participantsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<session_participantsCreateWithoutUsersInput, session_participantsUncheckedCreateWithoutUsersInput> | session_participantsCreateWithoutUsersInput[] | session_participantsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: session_participantsCreateOrConnectWithoutUsersInput | session_participantsCreateOrConnectWithoutUsersInput[]
    createMany?: session_participantsCreateManyUsersInputEnvelope
    connect?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
  }

  export type Enumusers_roleFieldUpdateOperationsInput = {
    set?: $Enums.users_role
  }

  export type participant_historyUpdateManyWithoutUsersNestedInput = {
    create?: XOR<participant_historyCreateWithoutUsersInput, participant_historyUncheckedCreateWithoutUsersInput> | participant_historyCreateWithoutUsersInput[] | participant_historyUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: participant_historyCreateOrConnectWithoutUsersInput | participant_historyCreateOrConnectWithoutUsersInput[]
    upsert?: participant_historyUpsertWithWhereUniqueWithoutUsersInput | participant_historyUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: participant_historyCreateManyUsersInputEnvelope
    set?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    disconnect?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    delete?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    connect?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    update?: participant_historyUpdateWithWhereUniqueWithoutUsersInput | participant_historyUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: participant_historyUpdateManyWithWhereWithoutUsersInput | participant_historyUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: participant_historyScalarWhereInput | participant_historyScalarWhereInput[]
  }

  export type quiz_sessionsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<quiz_sessionsCreateWithoutUsersInput, quiz_sessionsUncheckedCreateWithoutUsersInput> | quiz_sessionsCreateWithoutUsersInput[] | quiz_sessionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: quiz_sessionsCreateOrConnectWithoutUsersInput | quiz_sessionsCreateOrConnectWithoutUsersInput[]
    upsert?: quiz_sessionsUpsertWithWhereUniqueWithoutUsersInput | quiz_sessionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: quiz_sessionsCreateManyUsersInputEnvelope
    set?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    disconnect?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    delete?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    connect?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    update?: quiz_sessionsUpdateWithWhereUniqueWithoutUsersInput | quiz_sessionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: quiz_sessionsUpdateManyWithWhereWithoutUsersInput | quiz_sessionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: quiz_sessionsScalarWhereInput | quiz_sessionsScalarWhereInput[]
  }

  export type quizzesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<quizzesCreateWithoutUsersInput, quizzesUncheckedCreateWithoutUsersInput> | quizzesCreateWithoutUsersInput[] | quizzesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: quizzesCreateOrConnectWithoutUsersInput | quizzesCreateOrConnectWithoutUsersInput[]
    upsert?: quizzesUpsertWithWhereUniqueWithoutUsersInput | quizzesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: quizzesCreateManyUsersInputEnvelope
    set?: quizzesWhereUniqueInput | quizzesWhereUniqueInput[]
    disconnect?: quizzesWhereUniqueInput | quizzesWhereUniqueInput[]
    delete?: quizzesWhereUniqueInput | quizzesWhereUniqueInput[]
    connect?: quizzesWhereUniqueInput | quizzesWhereUniqueInput[]
    update?: quizzesUpdateWithWhereUniqueWithoutUsersInput | quizzesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: quizzesUpdateManyWithWhereWithoutUsersInput | quizzesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: quizzesScalarWhereInput | quizzesScalarWhereInput[]
  }

  export type session_participantsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<session_participantsCreateWithoutUsersInput, session_participantsUncheckedCreateWithoutUsersInput> | session_participantsCreateWithoutUsersInput[] | session_participantsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: session_participantsCreateOrConnectWithoutUsersInput | session_participantsCreateOrConnectWithoutUsersInput[]
    upsert?: session_participantsUpsertWithWhereUniqueWithoutUsersInput | session_participantsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: session_participantsCreateManyUsersInputEnvelope
    set?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    disconnect?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    delete?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    connect?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    update?: session_participantsUpdateWithWhereUniqueWithoutUsersInput | session_participantsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: session_participantsUpdateManyWithWhereWithoutUsersInput | session_participantsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: session_participantsScalarWhereInput | session_participantsScalarWhereInput[]
  }

  export type participant_historyUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<participant_historyCreateWithoutUsersInput, participant_historyUncheckedCreateWithoutUsersInput> | participant_historyCreateWithoutUsersInput[] | participant_historyUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: participant_historyCreateOrConnectWithoutUsersInput | participant_historyCreateOrConnectWithoutUsersInput[]
    upsert?: participant_historyUpsertWithWhereUniqueWithoutUsersInput | participant_historyUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: participant_historyCreateManyUsersInputEnvelope
    set?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    disconnect?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    delete?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    connect?: participant_historyWhereUniqueInput | participant_historyWhereUniqueInput[]
    update?: participant_historyUpdateWithWhereUniqueWithoutUsersInput | participant_historyUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: participant_historyUpdateManyWithWhereWithoutUsersInput | participant_historyUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: participant_historyScalarWhereInput | participant_historyScalarWhereInput[]
  }

  export type quiz_sessionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<quiz_sessionsCreateWithoutUsersInput, quiz_sessionsUncheckedCreateWithoutUsersInput> | quiz_sessionsCreateWithoutUsersInput[] | quiz_sessionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: quiz_sessionsCreateOrConnectWithoutUsersInput | quiz_sessionsCreateOrConnectWithoutUsersInput[]
    upsert?: quiz_sessionsUpsertWithWhereUniqueWithoutUsersInput | quiz_sessionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: quiz_sessionsCreateManyUsersInputEnvelope
    set?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    disconnect?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    delete?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    connect?: quiz_sessionsWhereUniqueInput | quiz_sessionsWhereUniqueInput[]
    update?: quiz_sessionsUpdateWithWhereUniqueWithoutUsersInput | quiz_sessionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: quiz_sessionsUpdateManyWithWhereWithoutUsersInput | quiz_sessionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: quiz_sessionsScalarWhereInput | quiz_sessionsScalarWhereInput[]
  }

  export type quizzesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<quizzesCreateWithoutUsersInput, quizzesUncheckedCreateWithoutUsersInput> | quizzesCreateWithoutUsersInput[] | quizzesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: quizzesCreateOrConnectWithoutUsersInput | quizzesCreateOrConnectWithoutUsersInput[]
    upsert?: quizzesUpsertWithWhereUniqueWithoutUsersInput | quizzesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: quizzesCreateManyUsersInputEnvelope
    set?: quizzesWhereUniqueInput | quizzesWhereUniqueInput[]
    disconnect?: quizzesWhereUniqueInput | quizzesWhereUniqueInput[]
    delete?: quizzesWhereUniqueInput | quizzesWhereUniqueInput[]
    connect?: quizzesWhereUniqueInput | quizzesWhereUniqueInput[]
    update?: quizzesUpdateWithWhereUniqueWithoutUsersInput | quizzesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: quizzesUpdateManyWithWhereWithoutUsersInput | quizzesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: quizzesScalarWhereInput | quizzesScalarWhereInput[]
  }

  export type session_participantsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<session_participantsCreateWithoutUsersInput, session_participantsUncheckedCreateWithoutUsersInput> | session_participantsCreateWithoutUsersInput[] | session_participantsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: session_participantsCreateOrConnectWithoutUsersInput | session_participantsCreateOrConnectWithoutUsersInput[]
    upsert?: session_participantsUpsertWithWhereUniqueWithoutUsersInput | session_participantsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: session_participantsCreateManyUsersInputEnvelope
    set?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    disconnect?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    delete?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    connect?: session_participantsWhereUniqueInput | session_participantsWhereUniqueInput[]
    update?: session_participantsUpdateWithWhereUniqueWithoutUsersInput | session_participantsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: session_participantsUpdateManyWithWhereWithoutUsersInput | session_participantsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: session_participantsScalarWhereInput | session_participantsScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumquestions_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.questions_type | Enumquestions_typeFieldRefInput<$PrismaModel>
    in?: $Enums.questions_type[]
    notIn?: $Enums.questions_type[]
    not?: NestedEnumquestions_typeFilter<$PrismaModel> | $Enums.questions_type
  }

  export type NestedEnumquestions_media_typeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.questions_media_type | Enumquestions_media_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.questions_media_type[] | null
    notIn?: $Enums.questions_media_type[] | null
    not?: NestedEnumquestions_media_typeNullableFilter<$PrismaModel> | $Enums.questions_media_type | null
  }

  export type NestedEnumquestions_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.questions_type | Enumquestions_typeFieldRefInput<$PrismaModel>
    in?: $Enums.questions_type[]
    notIn?: $Enums.questions_type[]
    not?: NestedEnumquestions_typeWithAggregatesFilter<$PrismaModel> | $Enums.questions_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumquestions_typeFilter<$PrismaModel>
    _max?: NestedEnumquestions_typeFilter<$PrismaModel>
  }

  export type NestedEnumquestions_media_typeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.questions_media_type | Enumquestions_media_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.questions_media_type[] | null
    notIn?: $Enums.questions_media_type[] | null
    not?: NestedEnumquestions_media_typeNullableWithAggregatesFilter<$PrismaModel> | $Enums.questions_media_type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumquestions_media_typeNullableFilter<$PrismaModel>
    _max?: NestedEnumquestions_media_typeNullableFilter<$PrismaModel>
  }

  export type NestedEnumquiz_sessions_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.quiz_sessions_status | Enumquiz_sessions_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.quiz_sessions_status[] | null
    notIn?: $Enums.quiz_sessions_status[] | null
    not?: NestedEnumquiz_sessions_statusNullableFilter<$PrismaModel> | $Enums.quiz_sessions_status | null
  }

  export type NestedEnumquiz_sessions_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.quiz_sessions_status | Enumquiz_sessions_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.quiz_sessions_status[] | null
    notIn?: $Enums.quiz_sessions_status[] | null
    not?: NestedEnumquiz_sessions_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.quiz_sessions_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumquiz_sessions_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumquiz_sessions_statusNullableFilter<$PrismaModel>
  }

  export type NestedEnumquizzes_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.quizzes_status | Enumquizzes_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.quizzes_status[] | null
    notIn?: $Enums.quizzes_status[] | null
    not?: NestedEnumquizzes_statusNullableFilter<$PrismaModel> | $Enums.quizzes_status | null
  }

  export type NestedEnumquizzes_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.quizzes_status | Enumquizzes_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.quizzes_status[] | null
    notIn?: $Enums.quizzes_status[] | null
    not?: NestedEnumquizzes_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.quizzes_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumquizzes_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumquizzes_statusNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumusers_roleFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[]
    notIn?: $Enums.users_role[]
    not?: NestedEnumusers_roleFilter<$PrismaModel> | $Enums.users_role
  }

  export type NestedEnumusers_roleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[]
    notIn?: $Enums.users_role[]
    not?: NestedEnumusers_roleWithAggregatesFilter<$PrismaModel> | $Enums.users_role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_roleFilter<$PrismaModel>
    _max?: NestedEnumusers_roleFilter<$PrismaModel>
  }

  export type session_participantsCreateWithoutAnswersInput = {
    join_code?: string | null
    team?: string | null
    score?: number | null
    streak?: number | null
    accuracy?: number | null
    joined_at?: Date | string | null
    quiz_sessions: quiz_sessionsCreateNestedOneWithoutSession_participantsInput
    users: usersCreateNestedOneWithoutSession_participantsInput
  }

  export type session_participantsUncheckedCreateWithoutAnswersInput = {
    id?: number
    session_id: number
    user_id: number
    join_code?: string | null
    team?: string | null
    score?: number | null
    streak?: number | null
    accuracy?: number | null
    joined_at?: Date | string | null
  }

  export type session_participantsCreateOrConnectWithoutAnswersInput = {
    where: session_participantsWhereUniqueInput
    create: XOR<session_participantsCreateWithoutAnswersInput, session_participantsUncheckedCreateWithoutAnswersInput>
  }

  export type questionsCreateWithoutAnswersInput = {
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    options?: optionsCreateNestedManyWithoutQuestionsInput
    matching_pairs?: matching_pairsCreateNestedManyWithoutQuestionsInput
    drag_drop_items?: drag_drop_itemsCreateNestedManyWithoutQuestionsInput
    ordering_items?: ordering_itemsCreateNestedManyWithoutQuestionsInput
    quizzes: quizzesCreateNestedOneWithoutQuestionsInput
  }

  export type questionsUncheckedCreateWithoutAnswersInput = {
    id?: number
    quiz_id: number
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    options?: optionsUncheckedCreateNestedManyWithoutQuestionsInput
    matching_pairs?: matching_pairsUncheckedCreateNestedManyWithoutQuestionsInput
    drag_drop_items?: drag_drop_itemsUncheckedCreateNestedManyWithoutQuestionsInput
    ordering_items?: ordering_itemsUncheckedCreateNestedManyWithoutQuestionsInput
  }

  export type questionsCreateOrConnectWithoutAnswersInput = {
    where: questionsWhereUniqueInput
    create: XOR<questionsCreateWithoutAnswersInput, questionsUncheckedCreateWithoutAnswersInput>
  }

  export type session_participantsUpsertWithoutAnswersInput = {
    update: XOR<session_participantsUpdateWithoutAnswersInput, session_participantsUncheckedUpdateWithoutAnswersInput>
    create: XOR<session_participantsCreateWithoutAnswersInput, session_participantsUncheckedCreateWithoutAnswersInput>
    where?: session_participantsWhereInput
  }

  export type session_participantsUpdateToOneWithWhereWithoutAnswersInput = {
    where?: session_participantsWhereInput
    data: XOR<session_participantsUpdateWithoutAnswersInput, session_participantsUncheckedUpdateWithoutAnswersInput>
  }

  export type session_participantsUpdateWithoutAnswersInput = {
    join_code?: NullableStringFieldUpdateOperationsInput | string | null
    team?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quiz_sessions?: quiz_sessionsUpdateOneRequiredWithoutSession_participantsNestedInput
    users?: usersUpdateOneRequiredWithoutSession_participantsNestedInput
  }

  export type session_participantsUncheckedUpdateWithoutAnswersInput = {
    id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    join_code?: NullableStringFieldUpdateOperationsInput | string | null
    team?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type questionsUpsertWithoutAnswersInput = {
    update: XOR<questionsUpdateWithoutAnswersInput, questionsUncheckedUpdateWithoutAnswersInput>
    create: XOR<questionsCreateWithoutAnswersInput, questionsUncheckedCreateWithoutAnswersInput>
    where?: questionsWhereInput
  }

  export type questionsUpdateToOneWithWhereWithoutAnswersInput = {
    where?: questionsWhereInput
    data: XOR<questionsUpdateWithoutAnswersInput, questionsUncheckedUpdateWithoutAnswersInput>
  }

  export type questionsUpdateWithoutAnswersInput = {
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    options?: optionsUpdateManyWithoutQuestionsNestedInput
    matching_pairs?: matching_pairsUpdateManyWithoutQuestionsNestedInput
    drag_drop_items?: drag_drop_itemsUpdateManyWithoutQuestionsNestedInput
    ordering_items?: ordering_itemsUpdateManyWithoutQuestionsNestedInput
    quizzes?: quizzesUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type questionsUncheckedUpdateWithoutAnswersInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    options?: optionsUncheckedUpdateManyWithoutQuestionsNestedInput
    matching_pairs?: matching_pairsUncheckedUpdateManyWithoutQuestionsNestedInput
    drag_drop_items?: drag_drop_itemsUncheckedUpdateManyWithoutQuestionsNestedInput
    ordering_items?: ordering_itemsUncheckedUpdateManyWithoutQuestionsNestedInput
  }

  export type questionsCreateWithoutOptionsInput = {
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    answers?: answersCreateNestedManyWithoutQuestionsInput
    matching_pairs?: matching_pairsCreateNestedManyWithoutQuestionsInput
    drag_drop_items?: drag_drop_itemsCreateNestedManyWithoutQuestionsInput
    ordering_items?: ordering_itemsCreateNestedManyWithoutQuestionsInput
    quizzes: quizzesCreateNestedOneWithoutQuestionsInput
  }

  export type questionsUncheckedCreateWithoutOptionsInput = {
    id?: number
    quiz_id: number
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    answers?: answersUncheckedCreateNestedManyWithoutQuestionsInput
    matching_pairs?: matching_pairsUncheckedCreateNestedManyWithoutQuestionsInput
    drag_drop_items?: drag_drop_itemsUncheckedCreateNestedManyWithoutQuestionsInput
    ordering_items?: ordering_itemsUncheckedCreateNestedManyWithoutQuestionsInput
  }

  export type questionsCreateOrConnectWithoutOptionsInput = {
    where: questionsWhereUniqueInput
    create: XOR<questionsCreateWithoutOptionsInput, questionsUncheckedCreateWithoutOptionsInput>
  }

  export type questionsUpsertWithoutOptionsInput = {
    update: XOR<questionsUpdateWithoutOptionsInput, questionsUncheckedUpdateWithoutOptionsInput>
    create: XOR<questionsCreateWithoutOptionsInput, questionsUncheckedCreateWithoutOptionsInput>
    where?: questionsWhereInput
  }

  export type questionsUpdateToOneWithWhereWithoutOptionsInput = {
    where?: questionsWhereInput
    data: XOR<questionsUpdateWithoutOptionsInput, questionsUncheckedUpdateWithoutOptionsInput>
  }

  export type questionsUpdateWithoutOptionsInput = {
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: answersUpdateManyWithoutQuestionsNestedInput
    matching_pairs?: matching_pairsUpdateManyWithoutQuestionsNestedInput
    drag_drop_items?: drag_drop_itemsUpdateManyWithoutQuestionsNestedInput
    ordering_items?: ordering_itemsUpdateManyWithoutQuestionsNestedInput
    quizzes?: quizzesUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type questionsUncheckedUpdateWithoutOptionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: answersUncheckedUpdateManyWithoutQuestionsNestedInput
    matching_pairs?: matching_pairsUncheckedUpdateManyWithoutQuestionsNestedInput
    drag_drop_items?: drag_drop_itemsUncheckedUpdateManyWithoutQuestionsNestedInput
    ordering_items?: ordering_itemsUncheckedUpdateManyWithoutQuestionsNestedInput
  }

  export type questionsCreateWithoutMatching_pairsInput = {
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    answers?: answersCreateNestedManyWithoutQuestionsInput
    options?: optionsCreateNestedManyWithoutQuestionsInput
    drag_drop_items?: drag_drop_itemsCreateNestedManyWithoutQuestionsInput
    ordering_items?: ordering_itemsCreateNestedManyWithoutQuestionsInput
    quizzes: quizzesCreateNestedOneWithoutQuestionsInput
  }

  export type questionsUncheckedCreateWithoutMatching_pairsInput = {
    id?: number
    quiz_id: number
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    answers?: answersUncheckedCreateNestedManyWithoutQuestionsInput
    options?: optionsUncheckedCreateNestedManyWithoutQuestionsInput
    drag_drop_items?: drag_drop_itemsUncheckedCreateNestedManyWithoutQuestionsInput
    ordering_items?: ordering_itemsUncheckedCreateNestedManyWithoutQuestionsInput
  }

  export type questionsCreateOrConnectWithoutMatching_pairsInput = {
    where: questionsWhereUniqueInput
    create: XOR<questionsCreateWithoutMatching_pairsInput, questionsUncheckedCreateWithoutMatching_pairsInput>
  }

  export type questionsUpsertWithoutMatching_pairsInput = {
    update: XOR<questionsUpdateWithoutMatching_pairsInput, questionsUncheckedUpdateWithoutMatching_pairsInput>
    create: XOR<questionsCreateWithoutMatching_pairsInput, questionsUncheckedCreateWithoutMatching_pairsInput>
    where?: questionsWhereInput
  }

  export type questionsUpdateToOneWithWhereWithoutMatching_pairsInput = {
    where?: questionsWhereInput
    data: XOR<questionsUpdateWithoutMatching_pairsInput, questionsUncheckedUpdateWithoutMatching_pairsInput>
  }

  export type questionsUpdateWithoutMatching_pairsInput = {
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: answersUpdateManyWithoutQuestionsNestedInput
    options?: optionsUpdateManyWithoutQuestionsNestedInput
    drag_drop_items?: drag_drop_itemsUpdateManyWithoutQuestionsNestedInput
    ordering_items?: ordering_itemsUpdateManyWithoutQuestionsNestedInput
    quizzes?: quizzesUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type questionsUncheckedUpdateWithoutMatching_pairsInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: answersUncheckedUpdateManyWithoutQuestionsNestedInput
    options?: optionsUncheckedUpdateManyWithoutQuestionsNestedInput
    drag_drop_items?: drag_drop_itemsUncheckedUpdateManyWithoutQuestionsNestedInput
    ordering_items?: ordering_itemsUncheckedUpdateManyWithoutQuestionsNestedInput
  }

  export type questionsCreateWithoutDrag_drop_itemsInput = {
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    answers?: answersCreateNestedManyWithoutQuestionsInput
    options?: optionsCreateNestedManyWithoutQuestionsInput
    matching_pairs?: matching_pairsCreateNestedManyWithoutQuestionsInput
    ordering_items?: ordering_itemsCreateNestedManyWithoutQuestionsInput
    quizzes: quizzesCreateNestedOneWithoutQuestionsInput
  }

  export type questionsUncheckedCreateWithoutDrag_drop_itemsInput = {
    id?: number
    quiz_id: number
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    answers?: answersUncheckedCreateNestedManyWithoutQuestionsInput
    options?: optionsUncheckedCreateNestedManyWithoutQuestionsInput
    matching_pairs?: matching_pairsUncheckedCreateNestedManyWithoutQuestionsInput
    ordering_items?: ordering_itemsUncheckedCreateNestedManyWithoutQuestionsInput
  }

  export type questionsCreateOrConnectWithoutDrag_drop_itemsInput = {
    where: questionsWhereUniqueInput
    create: XOR<questionsCreateWithoutDrag_drop_itemsInput, questionsUncheckedCreateWithoutDrag_drop_itemsInput>
  }

  export type questionsUpsertWithoutDrag_drop_itemsInput = {
    update: XOR<questionsUpdateWithoutDrag_drop_itemsInput, questionsUncheckedUpdateWithoutDrag_drop_itemsInput>
    create: XOR<questionsCreateWithoutDrag_drop_itemsInput, questionsUncheckedCreateWithoutDrag_drop_itemsInput>
    where?: questionsWhereInput
  }

  export type questionsUpdateToOneWithWhereWithoutDrag_drop_itemsInput = {
    where?: questionsWhereInput
    data: XOR<questionsUpdateWithoutDrag_drop_itemsInput, questionsUncheckedUpdateWithoutDrag_drop_itemsInput>
  }

  export type questionsUpdateWithoutDrag_drop_itemsInput = {
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: answersUpdateManyWithoutQuestionsNestedInput
    options?: optionsUpdateManyWithoutQuestionsNestedInput
    matching_pairs?: matching_pairsUpdateManyWithoutQuestionsNestedInput
    ordering_items?: ordering_itemsUpdateManyWithoutQuestionsNestedInput
    quizzes?: quizzesUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type questionsUncheckedUpdateWithoutDrag_drop_itemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: answersUncheckedUpdateManyWithoutQuestionsNestedInput
    options?: optionsUncheckedUpdateManyWithoutQuestionsNestedInput
    matching_pairs?: matching_pairsUncheckedUpdateManyWithoutQuestionsNestedInput
    ordering_items?: ordering_itemsUncheckedUpdateManyWithoutQuestionsNestedInput
  }

  export type questionsCreateWithoutOrdering_itemsInput = {
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    answers?: answersCreateNestedManyWithoutQuestionsInput
    options?: optionsCreateNestedManyWithoutQuestionsInput
    matching_pairs?: matching_pairsCreateNestedManyWithoutQuestionsInput
    drag_drop_items?: drag_drop_itemsCreateNestedManyWithoutQuestionsInput
    quizzes: quizzesCreateNestedOneWithoutQuestionsInput
  }

  export type questionsUncheckedCreateWithoutOrdering_itemsInput = {
    id?: number
    quiz_id: number
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    answers?: answersUncheckedCreateNestedManyWithoutQuestionsInput
    options?: optionsUncheckedCreateNestedManyWithoutQuestionsInput
    matching_pairs?: matching_pairsUncheckedCreateNestedManyWithoutQuestionsInput
    drag_drop_items?: drag_drop_itemsUncheckedCreateNestedManyWithoutQuestionsInput
  }

  export type questionsCreateOrConnectWithoutOrdering_itemsInput = {
    where: questionsWhereUniqueInput
    create: XOR<questionsCreateWithoutOrdering_itemsInput, questionsUncheckedCreateWithoutOrdering_itemsInput>
  }

  export type questionsUpsertWithoutOrdering_itemsInput = {
    update: XOR<questionsUpdateWithoutOrdering_itemsInput, questionsUncheckedUpdateWithoutOrdering_itemsInput>
    create: XOR<questionsCreateWithoutOrdering_itemsInput, questionsUncheckedCreateWithoutOrdering_itemsInput>
    where?: questionsWhereInput
  }

  export type questionsUpdateToOneWithWhereWithoutOrdering_itemsInput = {
    where?: questionsWhereInput
    data: XOR<questionsUpdateWithoutOrdering_itemsInput, questionsUncheckedUpdateWithoutOrdering_itemsInput>
  }

  export type questionsUpdateWithoutOrdering_itemsInput = {
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: answersUpdateManyWithoutQuestionsNestedInput
    options?: optionsUpdateManyWithoutQuestionsNestedInput
    matching_pairs?: matching_pairsUpdateManyWithoutQuestionsNestedInput
    drag_drop_items?: drag_drop_itemsUpdateManyWithoutQuestionsNestedInput
    quizzes?: quizzesUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type questionsUncheckedUpdateWithoutOrdering_itemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: answersUncheckedUpdateManyWithoutQuestionsNestedInput
    options?: optionsUncheckedUpdateManyWithoutQuestionsNestedInput
    matching_pairs?: matching_pairsUncheckedUpdateManyWithoutQuestionsNestedInput
    drag_drop_items?: drag_drop_itemsUncheckedUpdateManyWithoutQuestionsNestedInput
  }

  export type quizzesCreateWithoutTeamsInput = {
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
    participant_history?: participant_historyCreateNestedManyWithoutQuizzesInput
    questions?: questionsCreateNestedManyWithoutQuizzesInput
    quiz_sessions?: quiz_sessionsCreateNestedManyWithoutQuizzesInput
    users: usersCreateNestedOneWithoutQuizzesInput
  }

  export type quizzesUncheckedCreateWithoutTeamsInput = {
    id?: number
    user_id: number
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
    participant_history?: participant_historyUncheckedCreateNestedManyWithoutQuizzesInput
    questions?: questionsUncheckedCreateNestedManyWithoutQuizzesInput
    quiz_sessions?: quiz_sessionsUncheckedCreateNestedManyWithoutQuizzesInput
  }

  export type quizzesCreateOrConnectWithoutTeamsInput = {
    where: quizzesWhereUniqueInput
    create: XOR<quizzesCreateWithoutTeamsInput, quizzesUncheckedCreateWithoutTeamsInput>
  }

  export type quizzesUpsertWithoutTeamsInput = {
    update: XOR<quizzesUpdateWithoutTeamsInput, quizzesUncheckedUpdateWithoutTeamsInput>
    create: XOR<quizzesCreateWithoutTeamsInput, quizzesUncheckedCreateWithoutTeamsInput>
    where?: quizzesWhereInput
  }

  export type quizzesUpdateToOneWithWhereWithoutTeamsInput = {
    where?: quizzesWhereInput
    data: XOR<quizzesUpdateWithoutTeamsInput, quizzesUncheckedUpdateWithoutTeamsInput>
  }

  export type quizzesUpdateWithoutTeamsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUpdateManyWithoutQuizzesNestedInput
    questions?: questionsUpdateManyWithoutQuizzesNestedInput
    quiz_sessions?: quiz_sessionsUpdateManyWithoutQuizzesNestedInput
    users?: usersUpdateOneRequiredWithoutQuizzesNestedInput
  }

  export type quizzesUncheckedUpdateWithoutTeamsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUncheckedUpdateManyWithoutQuizzesNestedInput
    questions?: questionsUncheckedUpdateManyWithoutQuizzesNestedInput
    quiz_sessions?: quiz_sessionsUncheckedUpdateManyWithoutQuizzesNestedInput
  }

  export type usersCreateWithoutParticipant_historyInput = {
    username: string
    password: string
    email: string
    role?: $Enums.users_role
    created_at?: Date | string | null
    quiz_sessions?: quiz_sessionsCreateNestedManyWithoutUsersInput
    quizzes?: quizzesCreateNestedManyWithoutUsersInput
    session_participants?: session_participantsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutParticipant_historyInput = {
    id?: number
    username: string
    password: string
    email: string
    role?: $Enums.users_role
    created_at?: Date | string | null
    quiz_sessions?: quiz_sessionsUncheckedCreateNestedManyWithoutUsersInput
    quizzes?: quizzesUncheckedCreateNestedManyWithoutUsersInput
    session_participants?: session_participantsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutParticipant_historyInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutParticipant_historyInput, usersUncheckedCreateWithoutParticipant_historyInput>
  }

  export type quizzesCreateWithoutParticipant_historyInput = {
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
    questions?: questionsCreateNestedManyWithoutQuizzesInput
    quiz_sessions?: quiz_sessionsCreateNestedManyWithoutQuizzesInput
    teams?: teamsCreateNestedManyWithoutQuizzesInput
    users: usersCreateNestedOneWithoutQuizzesInput
  }

  export type quizzesUncheckedCreateWithoutParticipant_historyInput = {
    id?: number
    user_id: number
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
    questions?: questionsUncheckedCreateNestedManyWithoutQuizzesInput
    quiz_sessions?: quiz_sessionsUncheckedCreateNestedManyWithoutQuizzesInput
    teams?: teamsUncheckedCreateNestedManyWithoutQuizzesInput
  }

  export type quizzesCreateOrConnectWithoutParticipant_historyInput = {
    where: quizzesWhereUniqueInput
    create: XOR<quizzesCreateWithoutParticipant_historyInput, quizzesUncheckedCreateWithoutParticipant_historyInput>
  }

  export type usersUpsertWithoutParticipant_historyInput = {
    update: XOR<usersUpdateWithoutParticipant_historyInput, usersUncheckedUpdateWithoutParticipant_historyInput>
    create: XOR<usersCreateWithoutParticipant_historyInput, usersUncheckedCreateWithoutParticipant_historyInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutParticipant_historyInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutParticipant_historyInput, usersUncheckedUpdateWithoutParticipant_historyInput>
  }

  export type usersUpdateWithoutParticipant_historyInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quiz_sessions?: quiz_sessionsUpdateManyWithoutUsersNestedInput
    quizzes?: quizzesUpdateManyWithoutUsersNestedInput
    session_participants?: session_participantsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutParticipant_historyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quiz_sessions?: quiz_sessionsUncheckedUpdateManyWithoutUsersNestedInput
    quizzes?: quizzesUncheckedUpdateManyWithoutUsersNestedInput
    session_participants?: session_participantsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type quizzesUpsertWithoutParticipant_historyInput = {
    update: XOR<quizzesUpdateWithoutParticipant_historyInput, quizzesUncheckedUpdateWithoutParticipant_historyInput>
    create: XOR<quizzesCreateWithoutParticipant_historyInput, quizzesUncheckedCreateWithoutParticipant_historyInput>
    where?: quizzesWhereInput
  }

  export type quizzesUpdateToOneWithWhereWithoutParticipant_historyInput = {
    where?: quizzesWhereInput
    data: XOR<quizzesUpdateWithoutParticipant_historyInput, quizzesUncheckedUpdateWithoutParticipant_historyInput>
  }

  export type quizzesUpdateWithoutParticipant_historyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    questions?: questionsUpdateManyWithoutQuizzesNestedInput
    quiz_sessions?: quiz_sessionsUpdateManyWithoutQuizzesNestedInput
    teams?: teamsUpdateManyWithoutQuizzesNestedInput
    users?: usersUpdateOneRequiredWithoutQuizzesNestedInput
  }

  export type quizzesUncheckedUpdateWithoutParticipant_historyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    questions?: questionsUncheckedUpdateManyWithoutQuizzesNestedInput
    quiz_sessions?: quiz_sessionsUncheckedUpdateManyWithoutQuizzesNestedInput
    teams?: teamsUncheckedUpdateManyWithoutQuizzesNestedInput
  }

  export type answersCreateWithoutQuestionsInput = {
    selected_option?: string | null
    is_correct?: boolean | null
    time_taken?: number | null
    points_awarded?: number | null
    streak_at_time?: number | null
    answered_at?: Date | string | null
    session_participants: session_participantsCreateNestedOneWithoutAnswersInput
  }

  export type answersUncheckedCreateWithoutQuestionsInput = {
    id?: number
    session_participant_id: number
    selected_option?: string | null
    is_correct?: boolean | null
    time_taken?: number | null
    points_awarded?: number | null
    streak_at_time?: number | null
    answered_at?: Date | string | null
  }

  export type answersCreateOrConnectWithoutQuestionsInput = {
    where: answersWhereUniqueInput
    create: XOR<answersCreateWithoutQuestionsInput, answersUncheckedCreateWithoutQuestionsInput>
  }

  export type answersCreateManyQuestionsInputEnvelope = {
    data: answersCreateManyQuestionsInput | answersCreateManyQuestionsInput[]
    skipDuplicates?: boolean
  }

  export type optionsCreateWithoutQuestionsInput = {
    option_text: string
    option_index: number
  }

  export type optionsUncheckedCreateWithoutQuestionsInput = {
    id?: number
    option_text: string
    option_index: number
  }

  export type optionsCreateOrConnectWithoutQuestionsInput = {
    where: optionsWhereUniqueInput
    create: XOR<optionsCreateWithoutQuestionsInput, optionsUncheckedCreateWithoutQuestionsInput>
  }

  export type optionsCreateManyQuestionsInputEnvelope = {
    data: optionsCreateManyQuestionsInput | optionsCreateManyQuestionsInput[]
    skipDuplicates?: boolean
  }

  export type matching_pairsCreateWithoutQuestionsInput = {
    left_item: string
    right_item: string
    pair_index: number
  }

  export type matching_pairsUncheckedCreateWithoutQuestionsInput = {
    id?: number
    left_item: string
    right_item: string
    pair_index: number
  }

  export type matching_pairsCreateOrConnectWithoutQuestionsInput = {
    where: matching_pairsWhereUniqueInput
    create: XOR<matching_pairsCreateWithoutQuestionsInput, matching_pairsUncheckedCreateWithoutQuestionsInput>
  }

  export type matching_pairsCreateManyQuestionsInputEnvelope = {
    data: matching_pairsCreateManyQuestionsInput | matching_pairsCreateManyQuestionsInput[]
    skipDuplicates?: boolean
  }

  export type drag_drop_itemsCreateWithoutQuestionsInput = {
    item_text: string
    category: string
    item_index: number
  }

  export type drag_drop_itemsUncheckedCreateWithoutQuestionsInput = {
    id?: number
    item_text: string
    category: string
    item_index: number
  }

  export type drag_drop_itemsCreateOrConnectWithoutQuestionsInput = {
    where: drag_drop_itemsWhereUniqueInput
    create: XOR<drag_drop_itemsCreateWithoutQuestionsInput, drag_drop_itemsUncheckedCreateWithoutQuestionsInput>
  }

  export type drag_drop_itemsCreateManyQuestionsInputEnvelope = {
    data: drag_drop_itemsCreateManyQuestionsInput | drag_drop_itemsCreateManyQuestionsInput[]
    skipDuplicates?: boolean
  }

  export type ordering_itemsCreateWithoutQuestionsInput = {
    item_text: string
    correct_order: number
  }

  export type ordering_itemsUncheckedCreateWithoutQuestionsInput = {
    id?: number
    item_text: string
    correct_order: number
  }

  export type ordering_itemsCreateOrConnectWithoutQuestionsInput = {
    where: ordering_itemsWhereUniqueInput
    create: XOR<ordering_itemsCreateWithoutQuestionsInput, ordering_itemsUncheckedCreateWithoutQuestionsInput>
  }

  export type ordering_itemsCreateManyQuestionsInputEnvelope = {
    data: ordering_itemsCreateManyQuestionsInput | ordering_itemsCreateManyQuestionsInput[]
    skipDuplicates?: boolean
  }

  export type quizzesCreateWithoutQuestionsInput = {
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
    participant_history?: participant_historyCreateNestedManyWithoutQuizzesInput
    quiz_sessions?: quiz_sessionsCreateNestedManyWithoutQuizzesInput
    teams?: teamsCreateNestedManyWithoutQuizzesInput
    users: usersCreateNestedOneWithoutQuizzesInput
  }

  export type quizzesUncheckedCreateWithoutQuestionsInput = {
    id?: number
    user_id: number
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
    participant_history?: participant_historyUncheckedCreateNestedManyWithoutQuizzesInput
    quiz_sessions?: quiz_sessionsUncheckedCreateNestedManyWithoutQuizzesInput
    teams?: teamsUncheckedCreateNestedManyWithoutQuizzesInput
  }

  export type quizzesCreateOrConnectWithoutQuestionsInput = {
    where: quizzesWhereUniqueInput
    create: XOR<quizzesCreateWithoutQuestionsInput, quizzesUncheckedCreateWithoutQuestionsInput>
  }

  export type answersUpsertWithWhereUniqueWithoutQuestionsInput = {
    where: answersWhereUniqueInput
    update: XOR<answersUpdateWithoutQuestionsInput, answersUncheckedUpdateWithoutQuestionsInput>
    create: XOR<answersCreateWithoutQuestionsInput, answersUncheckedCreateWithoutQuestionsInput>
  }

  export type answersUpdateWithWhereUniqueWithoutQuestionsInput = {
    where: answersWhereUniqueInput
    data: XOR<answersUpdateWithoutQuestionsInput, answersUncheckedUpdateWithoutQuestionsInput>
  }

  export type answersUpdateManyWithWhereWithoutQuestionsInput = {
    where: answersScalarWhereInput
    data: XOR<answersUpdateManyMutationInput, answersUncheckedUpdateManyWithoutQuestionsInput>
  }

  export type answersScalarWhereInput = {
    AND?: answersScalarWhereInput | answersScalarWhereInput[]
    OR?: answersScalarWhereInput[]
    NOT?: answersScalarWhereInput | answersScalarWhereInput[]
    id?: IntFilter<"answers"> | number
    session_participant_id?: IntFilter<"answers"> | number
    question_id?: IntFilter<"answers"> | number
    selected_option?: StringNullableFilter<"answers"> | string | null
    is_correct?: BoolNullableFilter<"answers"> | boolean | null
    time_taken?: IntNullableFilter<"answers"> | number | null
    points_awarded?: IntNullableFilter<"answers"> | number | null
    streak_at_time?: IntNullableFilter<"answers"> | number | null
    answered_at?: DateTimeNullableFilter<"answers"> | Date | string | null
  }

  export type optionsUpsertWithWhereUniqueWithoutQuestionsInput = {
    where: optionsWhereUniqueInput
    update: XOR<optionsUpdateWithoutQuestionsInput, optionsUncheckedUpdateWithoutQuestionsInput>
    create: XOR<optionsCreateWithoutQuestionsInput, optionsUncheckedCreateWithoutQuestionsInput>
  }

  export type optionsUpdateWithWhereUniqueWithoutQuestionsInput = {
    where: optionsWhereUniqueInput
    data: XOR<optionsUpdateWithoutQuestionsInput, optionsUncheckedUpdateWithoutQuestionsInput>
  }

  export type optionsUpdateManyWithWhereWithoutQuestionsInput = {
    where: optionsScalarWhereInput
    data: XOR<optionsUpdateManyMutationInput, optionsUncheckedUpdateManyWithoutQuestionsInput>
  }

  export type optionsScalarWhereInput = {
    AND?: optionsScalarWhereInput | optionsScalarWhereInput[]
    OR?: optionsScalarWhereInput[]
    NOT?: optionsScalarWhereInput | optionsScalarWhereInput[]
    id?: IntFilter<"options"> | number
    question_id?: IntFilter<"options"> | number
    option_text?: StringFilter<"options"> | string
    option_index?: IntFilter<"options"> | number
  }

  export type matching_pairsUpsertWithWhereUniqueWithoutQuestionsInput = {
    where: matching_pairsWhereUniqueInput
    update: XOR<matching_pairsUpdateWithoutQuestionsInput, matching_pairsUncheckedUpdateWithoutQuestionsInput>
    create: XOR<matching_pairsCreateWithoutQuestionsInput, matching_pairsUncheckedCreateWithoutQuestionsInput>
  }

  export type matching_pairsUpdateWithWhereUniqueWithoutQuestionsInput = {
    where: matching_pairsWhereUniqueInput
    data: XOR<matching_pairsUpdateWithoutQuestionsInput, matching_pairsUncheckedUpdateWithoutQuestionsInput>
  }

  export type matching_pairsUpdateManyWithWhereWithoutQuestionsInput = {
    where: matching_pairsScalarWhereInput
    data: XOR<matching_pairsUpdateManyMutationInput, matching_pairsUncheckedUpdateManyWithoutQuestionsInput>
  }

  export type matching_pairsScalarWhereInput = {
    AND?: matching_pairsScalarWhereInput | matching_pairsScalarWhereInput[]
    OR?: matching_pairsScalarWhereInput[]
    NOT?: matching_pairsScalarWhereInput | matching_pairsScalarWhereInput[]
    id?: IntFilter<"matching_pairs"> | number
    question_id?: IntFilter<"matching_pairs"> | number
    left_item?: StringFilter<"matching_pairs"> | string
    right_item?: StringFilter<"matching_pairs"> | string
    pair_index?: IntFilter<"matching_pairs"> | number
  }

  export type drag_drop_itemsUpsertWithWhereUniqueWithoutQuestionsInput = {
    where: drag_drop_itemsWhereUniqueInput
    update: XOR<drag_drop_itemsUpdateWithoutQuestionsInput, drag_drop_itemsUncheckedUpdateWithoutQuestionsInput>
    create: XOR<drag_drop_itemsCreateWithoutQuestionsInput, drag_drop_itemsUncheckedCreateWithoutQuestionsInput>
  }

  export type drag_drop_itemsUpdateWithWhereUniqueWithoutQuestionsInput = {
    where: drag_drop_itemsWhereUniqueInput
    data: XOR<drag_drop_itemsUpdateWithoutQuestionsInput, drag_drop_itemsUncheckedUpdateWithoutQuestionsInput>
  }

  export type drag_drop_itemsUpdateManyWithWhereWithoutQuestionsInput = {
    where: drag_drop_itemsScalarWhereInput
    data: XOR<drag_drop_itemsUpdateManyMutationInput, drag_drop_itemsUncheckedUpdateManyWithoutQuestionsInput>
  }

  export type drag_drop_itemsScalarWhereInput = {
    AND?: drag_drop_itemsScalarWhereInput | drag_drop_itemsScalarWhereInput[]
    OR?: drag_drop_itemsScalarWhereInput[]
    NOT?: drag_drop_itemsScalarWhereInput | drag_drop_itemsScalarWhereInput[]
    id?: IntFilter<"drag_drop_items"> | number
    question_id?: IntFilter<"drag_drop_items"> | number
    item_text?: StringFilter<"drag_drop_items"> | string
    category?: StringFilter<"drag_drop_items"> | string
    item_index?: IntFilter<"drag_drop_items"> | number
  }

  export type ordering_itemsUpsertWithWhereUniqueWithoutQuestionsInput = {
    where: ordering_itemsWhereUniqueInput
    update: XOR<ordering_itemsUpdateWithoutQuestionsInput, ordering_itemsUncheckedUpdateWithoutQuestionsInput>
    create: XOR<ordering_itemsCreateWithoutQuestionsInput, ordering_itemsUncheckedCreateWithoutQuestionsInput>
  }

  export type ordering_itemsUpdateWithWhereUniqueWithoutQuestionsInput = {
    where: ordering_itemsWhereUniqueInput
    data: XOR<ordering_itemsUpdateWithoutQuestionsInput, ordering_itemsUncheckedUpdateWithoutQuestionsInput>
  }

  export type ordering_itemsUpdateManyWithWhereWithoutQuestionsInput = {
    where: ordering_itemsScalarWhereInput
    data: XOR<ordering_itemsUpdateManyMutationInput, ordering_itemsUncheckedUpdateManyWithoutQuestionsInput>
  }

  export type ordering_itemsScalarWhereInput = {
    AND?: ordering_itemsScalarWhereInput | ordering_itemsScalarWhereInput[]
    OR?: ordering_itemsScalarWhereInput[]
    NOT?: ordering_itemsScalarWhereInput | ordering_itemsScalarWhereInput[]
    id?: IntFilter<"ordering_items"> | number
    question_id?: IntFilter<"ordering_items"> | number
    item_text?: StringFilter<"ordering_items"> | string
    correct_order?: IntFilter<"ordering_items"> | number
  }

  export type quizzesUpsertWithoutQuestionsInput = {
    update: XOR<quizzesUpdateWithoutQuestionsInput, quizzesUncheckedUpdateWithoutQuestionsInput>
    create: XOR<quizzesCreateWithoutQuestionsInput, quizzesUncheckedCreateWithoutQuestionsInput>
    where?: quizzesWhereInput
  }

  export type quizzesUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: quizzesWhereInput
    data: XOR<quizzesUpdateWithoutQuestionsInput, quizzesUncheckedUpdateWithoutQuestionsInput>
  }

  export type quizzesUpdateWithoutQuestionsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUpdateManyWithoutQuizzesNestedInput
    quiz_sessions?: quiz_sessionsUpdateManyWithoutQuizzesNestedInput
    teams?: teamsUpdateManyWithoutQuizzesNestedInput
    users?: usersUpdateOneRequiredWithoutQuizzesNestedInput
  }

  export type quizzesUncheckedUpdateWithoutQuestionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUncheckedUpdateManyWithoutQuizzesNestedInput
    quiz_sessions?: quiz_sessionsUncheckedUpdateManyWithoutQuizzesNestedInput
    teams?: teamsUncheckedUpdateManyWithoutQuizzesNestedInput
  }

  export type quizzesCreateWithoutQuiz_sessionsInput = {
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
    participant_history?: participant_historyCreateNestedManyWithoutQuizzesInput
    questions?: questionsCreateNestedManyWithoutQuizzesInput
    teams?: teamsCreateNestedManyWithoutQuizzesInput
    users: usersCreateNestedOneWithoutQuizzesInput
  }

  export type quizzesUncheckedCreateWithoutQuiz_sessionsInput = {
    id?: number
    user_id: number
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
    participant_history?: participant_historyUncheckedCreateNestedManyWithoutQuizzesInput
    questions?: questionsUncheckedCreateNestedManyWithoutQuizzesInput
    teams?: teamsUncheckedCreateNestedManyWithoutQuizzesInput
  }

  export type quizzesCreateOrConnectWithoutQuiz_sessionsInput = {
    where: quizzesWhereUniqueInput
    create: XOR<quizzesCreateWithoutQuiz_sessionsInput, quizzesUncheckedCreateWithoutQuiz_sessionsInput>
  }

  export type usersCreateWithoutQuiz_sessionsInput = {
    username: string
    password: string
    email: string
    role?: $Enums.users_role
    created_at?: Date | string | null
    participant_history?: participant_historyCreateNestedManyWithoutUsersInput
    quizzes?: quizzesCreateNestedManyWithoutUsersInput
    session_participants?: session_participantsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutQuiz_sessionsInput = {
    id?: number
    username: string
    password: string
    email: string
    role?: $Enums.users_role
    created_at?: Date | string | null
    participant_history?: participant_historyUncheckedCreateNestedManyWithoutUsersInput
    quizzes?: quizzesUncheckedCreateNestedManyWithoutUsersInput
    session_participants?: session_participantsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutQuiz_sessionsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutQuiz_sessionsInput, usersUncheckedCreateWithoutQuiz_sessionsInput>
  }

  export type session_participantsCreateWithoutQuiz_sessionsInput = {
    join_code?: string | null
    team?: string | null
    score?: number | null
    streak?: number | null
    accuracy?: number | null
    joined_at?: Date | string | null
    answers?: answersCreateNestedManyWithoutSession_participantsInput
    users: usersCreateNestedOneWithoutSession_participantsInput
  }

  export type session_participantsUncheckedCreateWithoutQuiz_sessionsInput = {
    id?: number
    user_id: number
    join_code?: string | null
    team?: string | null
    score?: number | null
    streak?: number | null
    accuracy?: number | null
    joined_at?: Date | string | null
    answers?: answersUncheckedCreateNestedManyWithoutSession_participantsInput
  }

  export type session_participantsCreateOrConnectWithoutQuiz_sessionsInput = {
    where: session_participantsWhereUniqueInput
    create: XOR<session_participantsCreateWithoutQuiz_sessionsInput, session_participantsUncheckedCreateWithoutQuiz_sessionsInput>
  }

  export type session_participantsCreateManyQuiz_sessionsInputEnvelope = {
    data: session_participantsCreateManyQuiz_sessionsInput | session_participantsCreateManyQuiz_sessionsInput[]
    skipDuplicates?: boolean
  }

  export type quizzesUpsertWithoutQuiz_sessionsInput = {
    update: XOR<quizzesUpdateWithoutQuiz_sessionsInput, quizzesUncheckedUpdateWithoutQuiz_sessionsInput>
    create: XOR<quizzesCreateWithoutQuiz_sessionsInput, quizzesUncheckedCreateWithoutQuiz_sessionsInput>
    where?: quizzesWhereInput
  }

  export type quizzesUpdateToOneWithWhereWithoutQuiz_sessionsInput = {
    where?: quizzesWhereInput
    data: XOR<quizzesUpdateWithoutQuiz_sessionsInput, quizzesUncheckedUpdateWithoutQuiz_sessionsInput>
  }

  export type quizzesUpdateWithoutQuiz_sessionsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUpdateManyWithoutQuizzesNestedInput
    questions?: questionsUpdateManyWithoutQuizzesNestedInput
    teams?: teamsUpdateManyWithoutQuizzesNestedInput
    users?: usersUpdateOneRequiredWithoutQuizzesNestedInput
  }

  export type quizzesUncheckedUpdateWithoutQuiz_sessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUncheckedUpdateManyWithoutQuizzesNestedInput
    questions?: questionsUncheckedUpdateManyWithoutQuizzesNestedInput
    teams?: teamsUncheckedUpdateManyWithoutQuizzesNestedInput
  }

  export type usersUpsertWithoutQuiz_sessionsInput = {
    update: XOR<usersUpdateWithoutQuiz_sessionsInput, usersUncheckedUpdateWithoutQuiz_sessionsInput>
    create: XOR<usersCreateWithoutQuiz_sessionsInput, usersUncheckedCreateWithoutQuiz_sessionsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutQuiz_sessionsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutQuiz_sessionsInput, usersUncheckedUpdateWithoutQuiz_sessionsInput>
  }

  export type usersUpdateWithoutQuiz_sessionsInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUpdateManyWithoutUsersNestedInput
    quizzes?: quizzesUpdateManyWithoutUsersNestedInput
    session_participants?: session_participantsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutQuiz_sessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUncheckedUpdateManyWithoutUsersNestedInput
    quizzes?: quizzesUncheckedUpdateManyWithoutUsersNestedInput
    session_participants?: session_participantsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type session_participantsUpsertWithWhereUniqueWithoutQuiz_sessionsInput = {
    where: session_participantsWhereUniqueInput
    update: XOR<session_participantsUpdateWithoutQuiz_sessionsInput, session_participantsUncheckedUpdateWithoutQuiz_sessionsInput>
    create: XOR<session_participantsCreateWithoutQuiz_sessionsInput, session_participantsUncheckedCreateWithoutQuiz_sessionsInput>
  }

  export type session_participantsUpdateWithWhereUniqueWithoutQuiz_sessionsInput = {
    where: session_participantsWhereUniqueInput
    data: XOR<session_participantsUpdateWithoutQuiz_sessionsInput, session_participantsUncheckedUpdateWithoutQuiz_sessionsInput>
  }

  export type session_participantsUpdateManyWithWhereWithoutQuiz_sessionsInput = {
    where: session_participantsScalarWhereInput
    data: XOR<session_participantsUpdateManyMutationInput, session_participantsUncheckedUpdateManyWithoutQuiz_sessionsInput>
  }

  export type session_participantsScalarWhereInput = {
    AND?: session_participantsScalarWhereInput | session_participantsScalarWhereInput[]
    OR?: session_participantsScalarWhereInput[]
    NOT?: session_participantsScalarWhereInput | session_participantsScalarWhereInput[]
    id?: IntFilter<"session_participants"> | number
    session_id?: IntFilter<"session_participants"> | number
    user_id?: IntFilter<"session_participants"> | number
    join_code?: StringNullableFilter<"session_participants"> | string | null
    team?: StringNullableFilter<"session_participants"> | string | null
    score?: IntNullableFilter<"session_participants"> | number | null
    streak?: IntNullableFilter<"session_participants"> | number | null
    accuracy?: FloatNullableFilter<"session_participants"> | number | null
    joined_at?: DateTimeNullableFilter<"session_participants"> | Date | string | null
  }

  export type participant_historyCreateWithoutQuizzesInput = {
    total_sessions?: number | null
    total_score?: number | null
    total_correct?: number | null
    total_questions?: number | null
    best_streak?: number | null
    last_played?: Date | string | null
    users: usersCreateNestedOneWithoutParticipant_historyInput
  }

  export type participant_historyUncheckedCreateWithoutQuizzesInput = {
    id?: number
    user_id: number
    total_sessions?: number | null
    total_score?: number | null
    total_correct?: number | null
    total_questions?: number | null
    best_streak?: number | null
    last_played?: Date | string | null
  }

  export type participant_historyCreateOrConnectWithoutQuizzesInput = {
    where: participant_historyWhereUniqueInput
    create: XOR<participant_historyCreateWithoutQuizzesInput, participant_historyUncheckedCreateWithoutQuizzesInput>
  }

  export type participant_historyCreateManyQuizzesInputEnvelope = {
    data: participant_historyCreateManyQuizzesInput | participant_historyCreateManyQuizzesInput[]
    skipDuplicates?: boolean
  }

  export type questionsCreateWithoutQuizzesInput = {
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    answers?: answersCreateNestedManyWithoutQuestionsInput
    options?: optionsCreateNestedManyWithoutQuestionsInput
    matching_pairs?: matching_pairsCreateNestedManyWithoutQuestionsInput
    drag_drop_items?: drag_drop_itemsCreateNestedManyWithoutQuestionsInput
    ordering_items?: ordering_itemsCreateNestedManyWithoutQuestionsInput
  }

  export type questionsUncheckedCreateWithoutQuizzesInput = {
    id?: number
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
    answers?: answersUncheckedCreateNestedManyWithoutQuestionsInput
    options?: optionsUncheckedCreateNestedManyWithoutQuestionsInput
    matching_pairs?: matching_pairsUncheckedCreateNestedManyWithoutQuestionsInput
    drag_drop_items?: drag_drop_itemsUncheckedCreateNestedManyWithoutQuestionsInput
    ordering_items?: ordering_itemsUncheckedCreateNestedManyWithoutQuestionsInput
  }

  export type questionsCreateOrConnectWithoutQuizzesInput = {
    where: questionsWhereUniqueInput
    create: XOR<questionsCreateWithoutQuizzesInput, questionsUncheckedCreateWithoutQuizzesInput>
  }

  export type questionsCreateManyQuizzesInputEnvelope = {
    data: questionsCreateManyQuizzesInput | questionsCreateManyQuizzesInput[]
    skipDuplicates?: boolean
  }

  export type quiz_sessionsCreateWithoutQuizzesInput = {
    code: string
    status?: $Enums.quiz_sessions_status | null
    started_at?: Date | string | null
    ended_at?: Date | string | null
    users: usersCreateNestedOneWithoutQuiz_sessionsInput
    session_participants?: session_participantsCreateNestedManyWithoutQuiz_sessionsInput
  }

  export type quiz_sessionsUncheckedCreateWithoutQuizzesInput = {
    id?: number
    host_id: number
    code: string
    status?: $Enums.quiz_sessions_status | null
    started_at?: Date | string | null
    ended_at?: Date | string | null
    session_participants?: session_participantsUncheckedCreateNestedManyWithoutQuiz_sessionsInput
  }

  export type quiz_sessionsCreateOrConnectWithoutQuizzesInput = {
    where: quiz_sessionsWhereUniqueInput
    create: XOR<quiz_sessionsCreateWithoutQuizzesInput, quiz_sessionsUncheckedCreateWithoutQuizzesInput>
  }

  export type quiz_sessionsCreateManyQuizzesInputEnvelope = {
    data: quiz_sessionsCreateManyQuizzesInput | quiz_sessionsCreateManyQuizzesInput[]
    skipDuplicates?: boolean
  }

  export type teamsCreateWithoutQuizzesInput = {
    name: string
    color: string
    max_members?: number
    created_at?: Date | string | null
  }

  export type teamsUncheckedCreateWithoutQuizzesInput = {
    id?: number
    name: string
    color: string
    max_members?: number
    created_at?: Date | string | null
  }

  export type teamsCreateOrConnectWithoutQuizzesInput = {
    where: teamsWhereUniqueInput
    create: XOR<teamsCreateWithoutQuizzesInput, teamsUncheckedCreateWithoutQuizzesInput>
  }

  export type teamsCreateManyQuizzesInputEnvelope = {
    data: teamsCreateManyQuizzesInput | teamsCreateManyQuizzesInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutQuizzesInput = {
    username: string
    password: string
    email: string
    role?: $Enums.users_role
    created_at?: Date | string | null
    participant_history?: participant_historyCreateNestedManyWithoutUsersInput
    quiz_sessions?: quiz_sessionsCreateNestedManyWithoutUsersInput
    session_participants?: session_participantsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutQuizzesInput = {
    id?: number
    username: string
    password: string
    email: string
    role?: $Enums.users_role
    created_at?: Date | string | null
    participant_history?: participant_historyUncheckedCreateNestedManyWithoutUsersInput
    quiz_sessions?: quiz_sessionsUncheckedCreateNestedManyWithoutUsersInput
    session_participants?: session_participantsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutQuizzesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutQuizzesInput, usersUncheckedCreateWithoutQuizzesInput>
  }

  export type participant_historyUpsertWithWhereUniqueWithoutQuizzesInput = {
    where: participant_historyWhereUniqueInput
    update: XOR<participant_historyUpdateWithoutQuizzesInput, participant_historyUncheckedUpdateWithoutQuizzesInput>
    create: XOR<participant_historyCreateWithoutQuizzesInput, participant_historyUncheckedCreateWithoutQuizzesInput>
  }

  export type participant_historyUpdateWithWhereUniqueWithoutQuizzesInput = {
    where: participant_historyWhereUniqueInput
    data: XOR<participant_historyUpdateWithoutQuizzesInput, participant_historyUncheckedUpdateWithoutQuizzesInput>
  }

  export type participant_historyUpdateManyWithWhereWithoutQuizzesInput = {
    where: participant_historyScalarWhereInput
    data: XOR<participant_historyUpdateManyMutationInput, participant_historyUncheckedUpdateManyWithoutQuizzesInput>
  }

  export type participant_historyScalarWhereInput = {
    AND?: participant_historyScalarWhereInput | participant_historyScalarWhereInput[]
    OR?: participant_historyScalarWhereInput[]
    NOT?: participant_historyScalarWhereInput | participant_historyScalarWhereInput[]
    id?: IntFilter<"participant_history"> | number
    user_id?: IntFilter<"participant_history"> | number
    quiz_id?: IntFilter<"participant_history"> | number
    total_sessions?: IntNullableFilter<"participant_history"> | number | null
    total_score?: IntNullableFilter<"participant_history"> | number | null
    total_correct?: IntNullableFilter<"participant_history"> | number | null
    total_questions?: IntNullableFilter<"participant_history"> | number | null
    best_streak?: IntNullableFilter<"participant_history"> | number | null
    last_played?: DateTimeNullableFilter<"participant_history"> | Date | string | null
  }

  export type questionsUpsertWithWhereUniqueWithoutQuizzesInput = {
    where: questionsWhereUniqueInput
    update: XOR<questionsUpdateWithoutQuizzesInput, questionsUncheckedUpdateWithoutQuizzesInput>
    create: XOR<questionsCreateWithoutQuizzesInput, questionsUncheckedCreateWithoutQuizzesInput>
  }

  export type questionsUpdateWithWhereUniqueWithoutQuizzesInput = {
    where: questionsWhereUniqueInput
    data: XOR<questionsUpdateWithoutQuizzesInput, questionsUncheckedUpdateWithoutQuizzesInput>
  }

  export type questionsUpdateManyWithWhereWithoutQuizzesInput = {
    where: questionsScalarWhereInput
    data: XOR<questionsUpdateManyMutationInput, questionsUncheckedUpdateManyWithoutQuizzesInput>
  }

  export type questionsScalarWhereInput = {
    AND?: questionsScalarWhereInput | questionsScalarWhereInput[]
    OR?: questionsScalarWhereInput[]
    NOT?: questionsScalarWhereInput | questionsScalarWhereInput[]
    id?: IntFilter<"questions"> | number
    quiz_id?: IntFilter<"questions"> | number
    type?: Enumquestions_typeFilter<"questions"> | $Enums.questions_type
    question?: StringFilter<"questions"> | string
    correct_answer?: StringNullableFilter<"questions"> | string | null
    time_limit?: IntNullableFilter<"questions"> | number | null
    points?: IntNullableFilter<"questions"> | number | null
    category?: StringNullableFilter<"questions"> | string | null
    media_type?: Enumquestions_media_typeNullableFilter<"questions"> | $Enums.questions_media_type | null
    media_url?: StringNullableFilter<"questions"> | string | null
  }

  export type quiz_sessionsUpsertWithWhereUniqueWithoutQuizzesInput = {
    where: quiz_sessionsWhereUniqueInput
    update: XOR<quiz_sessionsUpdateWithoutQuizzesInput, quiz_sessionsUncheckedUpdateWithoutQuizzesInput>
    create: XOR<quiz_sessionsCreateWithoutQuizzesInput, quiz_sessionsUncheckedCreateWithoutQuizzesInput>
  }

  export type quiz_sessionsUpdateWithWhereUniqueWithoutQuizzesInput = {
    where: quiz_sessionsWhereUniqueInput
    data: XOR<quiz_sessionsUpdateWithoutQuizzesInput, quiz_sessionsUncheckedUpdateWithoutQuizzesInput>
  }

  export type quiz_sessionsUpdateManyWithWhereWithoutQuizzesInput = {
    where: quiz_sessionsScalarWhereInput
    data: XOR<quiz_sessionsUpdateManyMutationInput, quiz_sessionsUncheckedUpdateManyWithoutQuizzesInput>
  }

  export type quiz_sessionsScalarWhereInput = {
    AND?: quiz_sessionsScalarWhereInput | quiz_sessionsScalarWhereInput[]
    OR?: quiz_sessionsScalarWhereInput[]
    NOT?: quiz_sessionsScalarWhereInput | quiz_sessionsScalarWhereInput[]
    id?: IntFilter<"quiz_sessions"> | number
    quiz_id?: IntFilter<"quiz_sessions"> | number
    host_id?: IntFilter<"quiz_sessions"> | number
    code?: StringFilter<"quiz_sessions"> | string
    status?: Enumquiz_sessions_statusNullableFilter<"quiz_sessions"> | $Enums.quiz_sessions_status | null
    started_at?: DateTimeNullableFilter<"quiz_sessions"> | Date | string | null
    ended_at?: DateTimeNullableFilter<"quiz_sessions"> | Date | string | null
  }

  export type teamsUpsertWithWhereUniqueWithoutQuizzesInput = {
    where: teamsWhereUniqueInput
    update: XOR<teamsUpdateWithoutQuizzesInput, teamsUncheckedUpdateWithoutQuizzesInput>
    create: XOR<teamsCreateWithoutQuizzesInput, teamsUncheckedCreateWithoutQuizzesInput>
  }

  export type teamsUpdateWithWhereUniqueWithoutQuizzesInput = {
    where: teamsWhereUniqueInput
    data: XOR<teamsUpdateWithoutQuizzesInput, teamsUncheckedUpdateWithoutQuizzesInput>
  }

  export type teamsUpdateManyWithWhereWithoutQuizzesInput = {
    where: teamsScalarWhereInput
    data: XOR<teamsUpdateManyMutationInput, teamsUncheckedUpdateManyWithoutQuizzesInput>
  }

  export type teamsScalarWhereInput = {
    AND?: teamsScalarWhereInput | teamsScalarWhereInput[]
    OR?: teamsScalarWhereInput[]
    NOT?: teamsScalarWhereInput | teamsScalarWhereInput[]
    id?: IntFilter<"teams"> | number
    quiz_id?: IntFilter<"teams"> | number
    name?: StringFilter<"teams"> | string
    color?: StringFilter<"teams"> | string
    max_members?: IntFilter<"teams"> | number
    created_at?: DateTimeNullableFilter<"teams"> | Date | string | null
  }

  export type usersUpsertWithoutQuizzesInput = {
    update: XOR<usersUpdateWithoutQuizzesInput, usersUncheckedUpdateWithoutQuizzesInput>
    create: XOR<usersCreateWithoutQuizzesInput, usersUncheckedCreateWithoutQuizzesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutQuizzesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutQuizzesInput, usersUncheckedUpdateWithoutQuizzesInput>
  }

  export type usersUpdateWithoutQuizzesInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUpdateManyWithoutUsersNestedInput
    quiz_sessions?: quiz_sessionsUpdateManyWithoutUsersNestedInput
    session_participants?: session_participantsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutQuizzesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUncheckedUpdateManyWithoutUsersNestedInput
    quiz_sessions?: quiz_sessionsUncheckedUpdateManyWithoutUsersNestedInput
    session_participants?: session_participantsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type answersCreateWithoutSession_participantsInput = {
    selected_option?: string | null
    is_correct?: boolean | null
    time_taken?: number | null
    points_awarded?: number | null
    streak_at_time?: number | null
    answered_at?: Date | string | null
    questions: questionsCreateNestedOneWithoutAnswersInput
  }

  export type answersUncheckedCreateWithoutSession_participantsInput = {
    id?: number
    question_id: number
    selected_option?: string | null
    is_correct?: boolean | null
    time_taken?: number | null
    points_awarded?: number | null
    streak_at_time?: number | null
    answered_at?: Date | string | null
  }

  export type answersCreateOrConnectWithoutSession_participantsInput = {
    where: answersWhereUniqueInput
    create: XOR<answersCreateWithoutSession_participantsInput, answersUncheckedCreateWithoutSession_participantsInput>
  }

  export type answersCreateManySession_participantsInputEnvelope = {
    data: answersCreateManySession_participantsInput | answersCreateManySession_participantsInput[]
    skipDuplicates?: boolean
  }

  export type quiz_sessionsCreateWithoutSession_participantsInput = {
    code: string
    status?: $Enums.quiz_sessions_status | null
    started_at?: Date | string | null
    ended_at?: Date | string | null
    quizzes: quizzesCreateNestedOneWithoutQuiz_sessionsInput
    users: usersCreateNestedOneWithoutQuiz_sessionsInput
  }

  export type quiz_sessionsUncheckedCreateWithoutSession_participantsInput = {
    id?: number
    quiz_id: number
    host_id: number
    code: string
    status?: $Enums.quiz_sessions_status | null
    started_at?: Date | string | null
    ended_at?: Date | string | null
  }

  export type quiz_sessionsCreateOrConnectWithoutSession_participantsInput = {
    where: quiz_sessionsWhereUniqueInput
    create: XOR<quiz_sessionsCreateWithoutSession_participantsInput, quiz_sessionsUncheckedCreateWithoutSession_participantsInput>
  }

  export type usersCreateWithoutSession_participantsInput = {
    username: string
    password: string
    email: string
    role?: $Enums.users_role
    created_at?: Date | string | null
    participant_history?: participant_historyCreateNestedManyWithoutUsersInput
    quiz_sessions?: quiz_sessionsCreateNestedManyWithoutUsersInput
    quizzes?: quizzesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutSession_participantsInput = {
    id?: number
    username: string
    password: string
    email: string
    role?: $Enums.users_role
    created_at?: Date | string | null
    participant_history?: participant_historyUncheckedCreateNestedManyWithoutUsersInput
    quiz_sessions?: quiz_sessionsUncheckedCreateNestedManyWithoutUsersInput
    quizzes?: quizzesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutSession_participantsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutSession_participantsInput, usersUncheckedCreateWithoutSession_participantsInput>
  }

  export type answersUpsertWithWhereUniqueWithoutSession_participantsInput = {
    where: answersWhereUniqueInput
    update: XOR<answersUpdateWithoutSession_participantsInput, answersUncheckedUpdateWithoutSession_participantsInput>
    create: XOR<answersCreateWithoutSession_participantsInput, answersUncheckedCreateWithoutSession_participantsInput>
  }

  export type answersUpdateWithWhereUniqueWithoutSession_participantsInput = {
    where: answersWhereUniqueInput
    data: XOR<answersUpdateWithoutSession_participantsInput, answersUncheckedUpdateWithoutSession_participantsInput>
  }

  export type answersUpdateManyWithWhereWithoutSession_participantsInput = {
    where: answersScalarWhereInput
    data: XOR<answersUpdateManyMutationInput, answersUncheckedUpdateManyWithoutSession_participantsInput>
  }

  export type quiz_sessionsUpsertWithoutSession_participantsInput = {
    update: XOR<quiz_sessionsUpdateWithoutSession_participantsInput, quiz_sessionsUncheckedUpdateWithoutSession_participantsInput>
    create: XOR<quiz_sessionsCreateWithoutSession_participantsInput, quiz_sessionsUncheckedCreateWithoutSession_participantsInput>
    where?: quiz_sessionsWhereInput
  }

  export type quiz_sessionsUpdateToOneWithWhereWithoutSession_participantsInput = {
    where?: quiz_sessionsWhereInput
    data: XOR<quiz_sessionsUpdateWithoutSession_participantsInput, quiz_sessionsUncheckedUpdateWithoutSession_participantsInput>
  }

  export type quiz_sessionsUpdateWithoutSession_participantsInput = {
    code?: StringFieldUpdateOperationsInput | string
    status?: NullableEnumquiz_sessions_statusFieldUpdateOperationsInput | $Enums.quiz_sessions_status | null
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quizzes?: quizzesUpdateOneRequiredWithoutQuiz_sessionsNestedInput
    users?: usersUpdateOneRequiredWithoutQuiz_sessionsNestedInput
  }

  export type quiz_sessionsUncheckedUpdateWithoutSession_participantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    host_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: NullableEnumquiz_sessions_statusFieldUpdateOperationsInput | $Enums.quiz_sessions_status | null
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUpsertWithoutSession_participantsInput = {
    update: XOR<usersUpdateWithoutSession_participantsInput, usersUncheckedUpdateWithoutSession_participantsInput>
    create: XOR<usersCreateWithoutSession_participantsInput, usersUncheckedCreateWithoutSession_participantsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutSession_participantsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutSession_participantsInput, usersUncheckedUpdateWithoutSession_participantsInput>
  }

  export type usersUpdateWithoutSession_participantsInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUpdateManyWithoutUsersNestedInput
    quiz_sessions?: quiz_sessionsUpdateManyWithoutUsersNestedInput
    quizzes?: quizzesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutSession_participantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUncheckedUpdateManyWithoutUsersNestedInput
    quiz_sessions?: quiz_sessionsUncheckedUpdateManyWithoutUsersNestedInput
    quizzes?: quizzesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type participant_historyCreateWithoutUsersInput = {
    total_sessions?: number | null
    total_score?: number | null
    total_correct?: number | null
    total_questions?: number | null
    best_streak?: number | null
    last_played?: Date | string | null
    quizzes: quizzesCreateNestedOneWithoutParticipant_historyInput
  }

  export type participant_historyUncheckedCreateWithoutUsersInput = {
    id?: number
    quiz_id: number
    total_sessions?: number | null
    total_score?: number | null
    total_correct?: number | null
    total_questions?: number | null
    best_streak?: number | null
    last_played?: Date | string | null
  }

  export type participant_historyCreateOrConnectWithoutUsersInput = {
    where: participant_historyWhereUniqueInput
    create: XOR<participant_historyCreateWithoutUsersInput, participant_historyUncheckedCreateWithoutUsersInput>
  }

  export type participant_historyCreateManyUsersInputEnvelope = {
    data: participant_historyCreateManyUsersInput | participant_historyCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type quiz_sessionsCreateWithoutUsersInput = {
    code: string
    status?: $Enums.quiz_sessions_status | null
    started_at?: Date | string | null
    ended_at?: Date | string | null
    quizzes: quizzesCreateNestedOneWithoutQuiz_sessionsInput
    session_participants?: session_participantsCreateNestedManyWithoutQuiz_sessionsInput
  }

  export type quiz_sessionsUncheckedCreateWithoutUsersInput = {
    id?: number
    quiz_id: number
    code: string
    status?: $Enums.quiz_sessions_status | null
    started_at?: Date | string | null
    ended_at?: Date | string | null
    session_participants?: session_participantsUncheckedCreateNestedManyWithoutQuiz_sessionsInput
  }

  export type quiz_sessionsCreateOrConnectWithoutUsersInput = {
    where: quiz_sessionsWhereUniqueInput
    create: XOR<quiz_sessionsCreateWithoutUsersInput, quiz_sessionsUncheckedCreateWithoutUsersInput>
  }

  export type quiz_sessionsCreateManyUsersInputEnvelope = {
    data: quiz_sessionsCreateManyUsersInput | quiz_sessionsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type quizzesCreateWithoutUsersInput = {
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
    participant_history?: participant_historyCreateNestedManyWithoutQuizzesInput
    questions?: questionsCreateNestedManyWithoutQuizzesInput
    quiz_sessions?: quiz_sessionsCreateNestedManyWithoutQuizzesInput
    teams?: teamsCreateNestedManyWithoutQuizzesInput
  }

  export type quizzesUncheckedCreateWithoutUsersInput = {
    id?: number
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
    participant_history?: participant_historyUncheckedCreateNestedManyWithoutQuizzesInput
    questions?: questionsUncheckedCreateNestedManyWithoutQuizzesInput
    quiz_sessions?: quiz_sessionsUncheckedCreateNestedManyWithoutQuizzesInput
    teams?: teamsUncheckedCreateNestedManyWithoutQuizzesInput
  }

  export type quizzesCreateOrConnectWithoutUsersInput = {
    where: quizzesWhereUniqueInput
    create: XOR<quizzesCreateWithoutUsersInput, quizzesUncheckedCreateWithoutUsersInput>
  }

  export type quizzesCreateManyUsersInputEnvelope = {
    data: quizzesCreateManyUsersInput | quizzesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type session_participantsCreateWithoutUsersInput = {
    join_code?: string | null
    team?: string | null
    score?: number | null
    streak?: number | null
    accuracy?: number | null
    joined_at?: Date | string | null
    answers?: answersCreateNestedManyWithoutSession_participantsInput
    quiz_sessions: quiz_sessionsCreateNestedOneWithoutSession_participantsInput
  }

  export type session_participantsUncheckedCreateWithoutUsersInput = {
    id?: number
    session_id: number
    join_code?: string | null
    team?: string | null
    score?: number | null
    streak?: number | null
    accuracy?: number | null
    joined_at?: Date | string | null
    answers?: answersUncheckedCreateNestedManyWithoutSession_participantsInput
  }

  export type session_participantsCreateOrConnectWithoutUsersInput = {
    where: session_participantsWhereUniqueInput
    create: XOR<session_participantsCreateWithoutUsersInput, session_participantsUncheckedCreateWithoutUsersInput>
  }

  export type session_participantsCreateManyUsersInputEnvelope = {
    data: session_participantsCreateManyUsersInput | session_participantsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type participant_historyUpsertWithWhereUniqueWithoutUsersInput = {
    where: participant_historyWhereUniqueInput
    update: XOR<participant_historyUpdateWithoutUsersInput, participant_historyUncheckedUpdateWithoutUsersInput>
    create: XOR<participant_historyCreateWithoutUsersInput, participant_historyUncheckedCreateWithoutUsersInput>
  }

  export type participant_historyUpdateWithWhereUniqueWithoutUsersInput = {
    where: participant_historyWhereUniqueInput
    data: XOR<participant_historyUpdateWithoutUsersInput, participant_historyUncheckedUpdateWithoutUsersInput>
  }

  export type participant_historyUpdateManyWithWhereWithoutUsersInput = {
    where: participant_historyScalarWhereInput
    data: XOR<participant_historyUpdateManyMutationInput, participant_historyUncheckedUpdateManyWithoutUsersInput>
  }

  export type quiz_sessionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: quiz_sessionsWhereUniqueInput
    update: XOR<quiz_sessionsUpdateWithoutUsersInput, quiz_sessionsUncheckedUpdateWithoutUsersInput>
    create: XOR<quiz_sessionsCreateWithoutUsersInput, quiz_sessionsUncheckedCreateWithoutUsersInput>
  }

  export type quiz_sessionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: quiz_sessionsWhereUniqueInput
    data: XOR<quiz_sessionsUpdateWithoutUsersInput, quiz_sessionsUncheckedUpdateWithoutUsersInput>
  }

  export type quiz_sessionsUpdateManyWithWhereWithoutUsersInput = {
    where: quiz_sessionsScalarWhereInput
    data: XOR<quiz_sessionsUpdateManyMutationInput, quiz_sessionsUncheckedUpdateManyWithoutUsersInput>
  }

  export type quizzesUpsertWithWhereUniqueWithoutUsersInput = {
    where: quizzesWhereUniqueInput
    update: XOR<quizzesUpdateWithoutUsersInput, quizzesUncheckedUpdateWithoutUsersInput>
    create: XOR<quizzesCreateWithoutUsersInput, quizzesUncheckedCreateWithoutUsersInput>
  }

  export type quizzesUpdateWithWhereUniqueWithoutUsersInput = {
    where: quizzesWhereUniqueInput
    data: XOR<quizzesUpdateWithoutUsersInput, quizzesUncheckedUpdateWithoutUsersInput>
  }

  export type quizzesUpdateManyWithWhereWithoutUsersInput = {
    where: quizzesScalarWhereInput
    data: XOR<quizzesUpdateManyMutationInput, quizzesUncheckedUpdateManyWithoutUsersInput>
  }

  export type quizzesScalarWhereInput = {
    AND?: quizzesScalarWhereInput | quizzesScalarWhereInput[]
    OR?: quizzesScalarWhereInput[]
    NOT?: quizzesScalarWhereInput | quizzesScalarWhereInput[]
    id?: IntFilter<"quizzes"> | number
    user_id?: IntFilter<"quizzes"> | number
    title?: StringFilter<"quizzes"> | string
    description?: StringNullableFilter<"quizzes"> | string | null
    negative_marking?: BoolNullableFilter<"quizzes"> | boolean | null
    team_mode?: BoolNullableFilter<"quizzes"> | boolean | null
    status?: Enumquizzes_statusNullableFilter<"quizzes"> | $Enums.quizzes_status | null
    created_at?: DateTimeNullableFilter<"quizzes"> | Date | string | null
  }

  export type session_participantsUpsertWithWhereUniqueWithoutUsersInput = {
    where: session_participantsWhereUniqueInput
    update: XOR<session_participantsUpdateWithoutUsersInput, session_participantsUncheckedUpdateWithoutUsersInput>
    create: XOR<session_participantsCreateWithoutUsersInput, session_participantsUncheckedCreateWithoutUsersInput>
  }

  export type session_participantsUpdateWithWhereUniqueWithoutUsersInput = {
    where: session_participantsWhereUniqueInput
    data: XOR<session_participantsUpdateWithoutUsersInput, session_participantsUncheckedUpdateWithoutUsersInput>
  }

  export type session_participantsUpdateManyWithWhereWithoutUsersInput = {
    where: session_participantsScalarWhereInput
    data: XOR<session_participantsUpdateManyMutationInput, session_participantsUncheckedUpdateManyWithoutUsersInput>
  }

  export type answersCreateManyQuestionsInput = {
    id?: number
    session_participant_id: number
    selected_option?: string | null
    is_correct?: boolean | null
    time_taken?: number | null
    points_awarded?: number | null
    streak_at_time?: number | null
    answered_at?: Date | string | null
  }

  export type optionsCreateManyQuestionsInput = {
    id?: number
    option_text: string
    option_index: number
  }

  export type matching_pairsCreateManyQuestionsInput = {
    id?: number
    left_item: string
    right_item: string
    pair_index: number
  }

  export type drag_drop_itemsCreateManyQuestionsInput = {
    id?: number
    item_text: string
    category: string
    item_index: number
  }

  export type ordering_itemsCreateManyQuestionsInput = {
    id?: number
    item_text: string
    correct_order: number
  }

  export type answersUpdateWithoutQuestionsInput = {
    selected_option?: NullableStringFieldUpdateOperationsInput | string | null
    is_correct?: NullableBoolFieldUpdateOperationsInput | boolean | null
    time_taken?: NullableIntFieldUpdateOperationsInput | number | null
    points_awarded?: NullableIntFieldUpdateOperationsInput | number | null
    streak_at_time?: NullableIntFieldUpdateOperationsInput | number | null
    answered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    session_participants?: session_participantsUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type answersUncheckedUpdateWithoutQuestionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    session_participant_id?: IntFieldUpdateOperationsInput | number
    selected_option?: NullableStringFieldUpdateOperationsInput | string | null
    is_correct?: NullableBoolFieldUpdateOperationsInput | boolean | null
    time_taken?: NullableIntFieldUpdateOperationsInput | number | null
    points_awarded?: NullableIntFieldUpdateOperationsInput | number | null
    streak_at_time?: NullableIntFieldUpdateOperationsInput | number | null
    answered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type answersUncheckedUpdateManyWithoutQuestionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    session_participant_id?: IntFieldUpdateOperationsInput | number
    selected_option?: NullableStringFieldUpdateOperationsInput | string | null
    is_correct?: NullableBoolFieldUpdateOperationsInput | boolean | null
    time_taken?: NullableIntFieldUpdateOperationsInput | number | null
    points_awarded?: NullableIntFieldUpdateOperationsInput | number | null
    streak_at_time?: NullableIntFieldUpdateOperationsInput | number | null
    answered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type optionsUpdateWithoutQuestionsInput = {
    option_text?: StringFieldUpdateOperationsInput | string
    option_index?: IntFieldUpdateOperationsInput | number
  }

  export type optionsUncheckedUpdateWithoutQuestionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    option_text?: StringFieldUpdateOperationsInput | string
    option_index?: IntFieldUpdateOperationsInput | number
  }

  export type optionsUncheckedUpdateManyWithoutQuestionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    option_text?: StringFieldUpdateOperationsInput | string
    option_index?: IntFieldUpdateOperationsInput | number
  }

  export type matching_pairsUpdateWithoutQuestionsInput = {
    left_item?: StringFieldUpdateOperationsInput | string
    right_item?: StringFieldUpdateOperationsInput | string
    pair_index?: IntFieldUpdateOperationsInput | number
  }

  export type matching_pairsUncheckedUpdateWithoutQuestionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    left_item?: StringFieldUpdateOperationsInput | string
    right_item?: StringFieldUpdateOperationsInput | string
    pair_index?: IntFieldUpdateOperationsInput | number
  }

  export type matching_pairsUncheckedUpdateManyWithoutQuestionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    left_item?: StringFieldUpdateOperationsInput | string
    right_item?: StringFieldUpdateOperationsInput | string
    pair_index?: IntFieldUpdateOperationsInput | number
  }

  export type drag_drop_itemsUpdateWithoutQuestionsInput = {
    item_text?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_index?: IntFieldUpdateOperationsInput | number
  }

  export type drag_drop_itemsUncheckedUpdateWithoutQuestionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_text?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_index?: IntFieldUpdateOperationsInput | number
  }

  export type drag_drop_itemsUncheckedUpdateManyWithoutQuestionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_text?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_index?: IntFieldUpdateOperationsInput | number
  }

  export type ordering_itemsUpdateWithoutQuestionsInput = {
    item_text?: StringFieldUpdateOperationsInput | string
    correct_order?: IntFieldUpdateOperationsInput | number
  }

  export type ordering_itemsUncheckedUpdateWithoutQuestionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_text?: StringFieldUpdateOperationsInput | string
    correct_order?: IntFieldUpdateOperationsInput | number
  }

  export type ordering_itemsUncheckedUpdateManyWithoutQuestionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_text?: StringFieldUpdateOperationsInput | string
    correct_order?: IntFieldUpdateOperationsInput | number
  }

  export type session_participantsCreateManyQuiz_sessionsInput = {
    id?: number
    user_id: number
    join_code?: string | null
    team?: string | null
    score?: number | null
    streak?: number | null
    accuracy?: number | null
    joined_at?: Date | string | null
  }

  export type session_participantsUpdateWithoutQuiz_sessionsInput = {
    join_code?: NullableStringFieldUpdateOperationsInput | string | null
    team?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: answersUpdateManyWithoutSession_participantsNestedInput
    users?: usersUpdateOneRequiredWithoutSession_participantsNestedInput
  }

  export type session_participantsUncheckedUpdateWithoutQuiz_sessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    join_code?: NullableStringFieldUpdateOperationsInput | string | null
    team?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: answersUncheckedUpdateManyWithoutSession_participantsNestedInput
  }

  export type session_participantsUncheckedUpdateManyWithoutQuiz_sessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    join_code?: NullableStringFieldUpdateOperationsInput | string | null
    team?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type participant_historyCreateManyQuizzesInput = {
    id?: number
    user_id: number
    total_sessions?: number | null
    total_score?: number | null
    total_correct?: number | null
    total_questions?: number | null
    best_streak?: number | null
    last_played?: Date | string | null
  }

  export type questionsCreateManyQuizzesInput = {
    id?: number
    type: $Enums.questions_type
    question: string
    correct_answer?: string | null
    time_limit?: number | null
    points?: number | null
    category?: string | null
    media_type?: $Enums.questions_media_type | null
    media_url?: string | null
  }

  export type quiz_sessionsCreateManyQuizzesInput = {
    id?: number
    host_id: number
    code: string
    status?: $Enums.quiz_sessions_status | null
    started_at?: Date | string | null
    ended_at?: Date | string | null
  }

  export type teamsCreateManyQuizzesInput = {
    id?: number
    name: string
    color: string
    max_members?: number
    created_at?: Date | string | null
  }

  export type participant_historyUpdateWithoutQuizzesInput = {
    total_sessions?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: NullableIntFieldUpdateOperationsInput | number | null
    total_correct?: NullableIntFieldUpdateOperationsInput | number | null
    total_questions?: NullableIntFieldUpdateOperationsInput | number | null
    best_streak?: NullableIntFieldUpdateOperationsInput | number | null
    last_played?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutParticipant_historyNestedInput
  }

  export type participant_historyUncheckedUpdateWithoutQuizzesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    total_sessions?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: NullableIntFieldUpdateOperationsInput | number | null
    total_correct?: NullableIntFieldUpdateOperationsInput | number | null
    total_questions?: NullableIntFieldUpdateOperationsInput | number | null
    best_streak?: NullableIntFieldUpdateOperationsInput | number | null
    last_played?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type participant_historyUncheckedUpdateManyWithoutQuizzesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    total_sessions?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: NullableIntFieldUpdateOperationsInput | number | null
    total_correct?: NullableIntFieldUpdateOperationsInput | number | null
    total_questions?: NullableIntFieldUpdateOperationsInput | number | null
    best_streak?: NullableIntFieldUpdateOperationsInput | number | null
    last_played?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type questionsUpdateWithoutQuizzesInput = {
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: answersUpdateManyWithoutQuestionsNestedInput
    options?: optionsUpdateManyWithoutQuestionsNestedInput
    matching_pairs?: matching_pairsUpdateManyWithoutQuestionsNestedInput
    drag_drop_items?: drag_drop_itemsUpdateManyWithoutQuestionsNestedInput
    ordering_items?: ordering_itemsUpdateManyWithoutQuestionsNestedInput
  }

  export type questionsUncheckedUpdateWithoutQuizzesInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: answersUncheckedUpdateManyWithoutQuestionsNestedInput
    options?: optionsUncheckedUpdateManyWithoutQuestionsNestedInput
    matching_pairs?: matching_pairsUncheckedUpdateManyWithoutQuestionsNestedInput
    drag_drop_items?: drag_drop_itemsUncheckedUpdateManyWithoutQuestionsNestedInput
    ordering_items?: ordering_itemsUncheckedUpdateManyWithoutQuestionsNestedInput
  }

  export type questionsUncheckedUpdateManyWithoutQuizzesInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: Enumquestions_typeFieldUpdateOperationsInput | $Enums.questions_type
    question?: StringFieldUpdateOperationsInput | string
    correct_answer?: NullableStringFieldUpdateOperationsInput | string | null
    time_limit?: NullableIntFieldUpdateOperationsInput | number | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    media_type?: NullableEnumquestions_media_typeFieldUpdateOperationsInput | $Enums.questions_media_type | null
    media_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type quiz_sessionsUpdateWithoutQuizzesInput = {
    code?: StringFieldUpdateOperationsInput | string
    status?: NullableEnumquiz_sessions_statusFieldUpdateOperationsInput | $Enums.quiz_sessions_status | null
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutQuiz_sessionsNestedInput
    session_participants?: session_participantsUpdateManyWithoutQuiz_sessionsNestedInput
  }

  export type quiz_sessionsUncheckedUpdateWithoutQuizzesInput = {
    id?: IntFieldUpdateOperationsInput | number
    host_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: NullableEnumquiz_sessions_statusFieldUpdateOperationsInput | $Enums.quiz_sessions_status | null
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    session_participants?: session_participantsUncheckedUpdateManyWithoutQuiz_sessionsNestedInput
  }

  export type quiz_sessionsUncheckedUpdateManyWithoutQuizzesInput = {
    id?: IntFieldUpdateOperationsInput | number
    host_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: NullableEnumquiz_sessions_statusFieldUpdateOperationsInput | $Enums.quiz_sessions_status | null
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type teamsUpdateWithoutQuizzesInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    max_members?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type teamsUncheckedUpdateWithoutQuizzesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    max_members?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type teamsUncheckedUpdateManyWithoutQuizzesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    max_members?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type answersCreateManySession_participantsInput = {
    id?: number
    question_id: number
    selected_option?: string | null
    is_correct?: boolean | null
    time_taken?: number | null
    points_awarded?: number | null
    streak_at_time?: number | null
    answered_at?: Date | string | null
  }

  export type answersUpdateWithoutSession_participantsInput = {
    selected_option?: NullableStringFieldUpdateOperationsInput | string | null
    is_correct?: NullableBoolFieldUpdateOperationsInput | boolean | null
    time_taken?: NullableIntFieldUpdateOperationsInput | number | null
    points_awarded?: NullableIntFieldUpdateOperationsInput | number | null
    streak_at_time?: NullableIntFieldUpdateOperationsInput | number | null
    answered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    questions?: questionsUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type answersUncheckedUpdateWithoutSession_participantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    question_id?: IntFieldUpdateOperationsInput | number
    selected_option?: NullableStringFieldUpdateOperationsInput | string | null
    is_correct?: NullableBoolFieldUpdateOperationsInput | boolean | null
    time_taken?: NullableIntFieldUpdateOperationsInput | number | null
    points_awarded?: NullableIntFieldUpdateOperationsInput | number | null
    streak_at_time?: NullableIntFieldUpdateOperationsInput | number | null
    answered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type answersUncheckedUpdateManyWithoutSession_participantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    question_id?: IntFieldUpdateOperationsInput | number
    selected_option?: NullableStringFieldUpdateOperationsInput | string | null
    is_correct?: NullableBoolFieldUpdateOperationsInput | boolean | null
    time_taken?: NullableIntFieldUpdateOperationsInput | number | null
    points_awarded?: NullableIntFieldUpdateOperationsInput | number | null
    streak_at_time?: NullableIntFieldUpdateOperationsInput | number | null
    answered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type participant_historyCreateManyUsersInput = {
    id?: number
    quiz_id: number
    total_sessions?: number | null
    total_score?: number | null
    total_correct?: number | null
    total_questions?: number | null
    best_streak?: number | null
    last_played?: Date | string | null
  }

  export type quiz_sessionsCreateManyUsersInput = {
    id?: number
    quiz_id: number
    code: string
    status?: $Enums.quiz_sessions_status | null
    started_at?: Date | string | null
    ended_at?: Date | string | null
  }

  export type quizzesCreateManyUsersInput = {
    id?: number
    title: string
    description?: string | null
    negative_marking?: boolean | null
    team_mode?: boolean | null
    status?: $Enums.quizzes_status | null
    created_at?: Date | string | null
  }

  export type session_participantsCreateManyUsersInput = {
    id?: number
    session_id: number
    join_code?: string | null
    team?: string | null
    score?: number | null
    streak?: number | null
    accuracy?: number | null
    joined_at?: Date | string | null
  }

  export type participant_historyUpdateWithoutUsersInput = {
    total_sessions?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: NullableIntFieldUpdateOperationsInput | number | null
    total_correct?: NullableIntFieldUpdateOperationsInput | number | null
    total_questions?: NullableIntFieldUpdateOperationsInput | number | null
    best_streak?: NullableIntFieldUpdateOperationsInput | number | null
    last_played?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quizzes?: quizzesUpdateOneRequiredWithoutParticipant_historyNestedInput
  }

  export type participant_historyUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    total_sessions?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: NullableIntFieldUpdateOperationsInput | number | null
    total_correct?: NullableIntFieldUpdateOperationsInput | number | null
    total_questions?: NullableIntFieldUpdateOperationsInput | number | null
    best_streak?: NullableIntFieldUpdateOperationsInput | number | null
    last_played?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type participant_historyUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    total_sessions?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: NullableIntFieldUpdateOperationsInput | number | null
    total_correct?: NullableIntFieldUpdateOperationsInput | number | null
    total_questions?: NullableIntFieldUpdateOperationsInput | number | null
    best_streak?: NullableIntFieldUpdateOperationsInput | number | null
    last_played?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type quiz_sessionsUpdateWithoutUsersInput = {
    code?: StringFieldUpdateOperationsInput | string
    status?: NullableEnumquiz_sessions_statusFieldUpdateOperationsInput | $Enums.quiz_sessions_status | null
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quizzes?: quizzesUpdateOneRequiredWithoutQuiz_sessionsNestedInput
    session_participants?: session_participantsUpdateManyWithoutQuiz_sessionsNestedInput
  }

  export type quiz_sessionsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: NullableEnumquiz_sessions_statusFieldUpdateOperationsInput | $Enums.quiz_sessions_status | null
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    session_participants?: session_participantsUncheckedUpdateManyWithoutQuiz_sessionsNestedInput
  }

  export type quiz_sessionsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    quiz_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: NullableEnumquiz_sessions_statusFieldUpdateOperationsInput | $Enums.quiz_sessions_status | null
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type quizzesUpdateWithoutUsersInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUpdateManyWithoutQuizzesNestedInput
    questions?: questionsUpdateManyWithoutQuizzesNestedInput
    quiz_sessions?: quiz_sessionsUpdateManyWithoutQuizzesNestedInput
    teams?: teamsUpdateManyWithoutQuizzesNestedInput
  }

  export type quizzesUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participant_history?: participant_historyUncheckedUpdateManyWithoutQuizzesNestedInput
    questions?: questionsUncheckedUpdateManyWithoutQuizzesNestedInput
    quiz_sessions?: quiz_sessionsUncheckedUpdateManyWithoutQuizzesNestedInput
    teams?: teamsUncheckedUpdateManyWithoutQuizzesNestedInput
  }

  export type quizzesUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    negative_marking?: NullableBoolFieldUpdateOperationsInput | boolean | null
    team_mode?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: NullableEnumquizzes_statusFieldUpdateOperationsInput | $Enums.quizzes_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type session_participantsUpdateWithoutUsersInput = {
    join_code?: NullableStringFieldUpdateOperationsInput | string | null
    team?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: answersUpdateManyWithoutSession_participantsNestedInput
    quiz_sessions?: quiz_sessionsUpdateOneRequiredWithoutSession_participantsNestedInput
  }

  export type session_participantsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    join_code?: NullableStringFieldUpdateOperationsInput | string | null
    team?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: answersUncheckedUpdateManyWithoutSession_participantsNestedInput
  }

  export type session_participantsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    join_code?: NullableStringFieldUpdateOperationsInput | string | null
    team?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}