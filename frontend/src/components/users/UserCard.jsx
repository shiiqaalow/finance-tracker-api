import {
  Calendar,
  Mail,
  MoreHorizontal,
  ShieldCheck,
  User,
} from "lucide-react";

export const UserCard = ({ user }) => {
  const isAdmin = user.role === "admin";

  return (
    <div className="rounded-xl border bg-background/60 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <div className="flex items-start gap-4 min-w-0 flex-1">
          {/* Avatar */}
          <div
            className={`h-12 w-12 shrink-0 overflow-hidden rounded-xl flex items-center justify-center font-semibold ${
              isAdmin
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-lg">
                {user.name?.charAt(0) || <User className="h-5 w-5" />}
              </span>
            )}
          </div>

          {/* User Details */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-sm font-semibold capitalize md:text-base">
                {user.name}
              </h3>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase ${
                  isAdmin
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isAdmin && <ShieldCheck className="h-3 w-3" />}
                {user.role}
              </span>
            </div>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="flex items-center gap-1 text-xs text-muted-foreground break-all">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span>{user.email}</span>
              </div>

              {user.createdAt && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>
                    {new Date(user.createdAt).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end sm:justify-center">
          <button className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};