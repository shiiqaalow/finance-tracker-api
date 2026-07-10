import {
  Camera,
  CalendarDays,
  BadgeCheck,
  Pencil,
} from "lucide-react";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ProfileHeader({ user }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-r from-primary via-primary/90 to-blue-600 text-white shadow-lg">

      {/* Decorative Blur */}
      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-16 -bottom-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex flex-col items-center gap-6 sm:flex-row">

          <div className="relative">

            <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <button
              className="
                absolute
                bottom-0
                right-0
                rounded-full
                bg-white
                p-2
                text-primary
                shadow-lg
                transition
                hover:scale-110
              "
            >
              <Camera size={18} />
            </button>
          </div>

          <div className="space-y-2 text-center sm:text-left">

            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">

              <h1 className="text-3xl font-bold">
                {user.name}
              </h1>

              <BadgeCheck
                size={22}
                className="text-green-300"
              />

            </div>

            <p className="text-white/80">
              {user.email}
            </p>

            <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur">
              {user.role}
            </span>

            <div className="flex items-center justify-center gap-2 text-sm text-white/80 sm:justify-start">

              <CalendarDays size={16} />

              <span>
                Joined {user.joined}
              </span>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-wrap justify-center gap-3 lg:justify-end">

          <Button
            variant="secondary"
            className="cursor-pointer rounded-xl"
          >
            <Camera className="mr-2 h-4 w-4" />
            Upload Photo
          </Button>

          <Button
            className="cursor-pointer rounded-xl bg-black/20 hover:bg-black/30"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>

        </div>

      </div>
    </div>
  );
}