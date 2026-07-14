import { Skeleton } from '@/components/ui/skeleton'

export const CodeUpContributionSkeleton = () => {
  const weeks = Array.from({ length: 53 })
  const days = Array.from({ length: 7 })

  return (
    <div className="my-10">
      <div className="flex flex-col mb-2 gap-4 ml-2">
        <Skeleton className="h-6 w-60" />
        <Skeleton className="h-5 w-40" />
      </div>

      <div className="p-6 bg-[#0d1117] border border-[#30363d] rounded-lg w-[82%]">
        <div className="flex flex-col gap-4 text-sm text-[#7d8590] min-w-max">
          <div className="ml-10 flex gap-[4px]">
            {weeks.map((_, i) => (
              <Skeleton key={i} className="w-[13px] h-[10px]" />
            ))}
          </div>

          <div className="flex">
            <div className="flex flex-col justify-between mr-3 h-[105px] text-[12px] text-[#7d8590]">
              <span style={{ lineHeight: '13px' }}>Mon</span>
              <span style={{ lineHeight: '13px' }}>Wed</span>
              <span style={{ lineHeight: '13px' }}>Fri</span>
            </div>

            <div className="flex gap-[4px]">
              {weeks.map((_, i) => (
                <div key={i} className="flex flex-col gap-[4px]">
                  {days.map((_, j) => (
                    <Skeleton
                      key={j}
                      className="w-[13px] h-[13px] rounded-sm bg-[#1c2128]"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
