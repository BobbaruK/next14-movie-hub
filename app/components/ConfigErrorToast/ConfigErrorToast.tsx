"use client";

import { RQ_CONFIG_KEY } from "@/app/constants";
import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import { useQuery } from "@tanstack/react-query";

const ConfigErrorToast = () => {
  const { error } = useQuery<TMDB_API_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
  });

  return (
    <>
      {error && (
        <div className="toast transition ease-in-out">
          <div className="alert alert-error">
            <span>{error.name}: Failed to fetch TMDBAPI config</span>
            <button
              className="bg-primary-content rounded-lg w-8 h-8 text-primary grid items-center"
              onClick={(e) => {
                const btn = e.target as HTMLButtonElement;
                const toast = btn.closest(".toast");
                toast?.classList.add("hidden");
              }}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfigErrorToast;
