import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db"; // Adjust to your Prisma instance
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Find user by username
    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (
      user &&
      user.password &&
      password &&
      (await bcrypt.compare(password, user.password))
    ) {
      // Respond with user ID and role
      return NextResponse.json({
        success: true,
        id: user.id,
        role: user.role,  // Should be "host" or "participant"
      });
    }

    // Invalid credentials
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("[Login API error]", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
