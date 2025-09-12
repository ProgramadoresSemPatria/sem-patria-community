'use client'

import { format } from 'date-fns'
import useContributionPanel from './use-contribution-panel'
import { CodeUpContributionSkeleton } from './skeleton'

export default function CodeUpContributionPanel() {
  const {
    getMonthLabel,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    hoveredDate,
    isActive,
    mousePosition,
    weeks,
    numberOfContributions,
    isLoadingActiveDates
  } = useContributionPanel()

  if (isLoadingActiveDates) {
    return <CodeUpContributionSkeleton />
  }

  return (
    <div className="my-10">
      <div className="flex flex-col mb-2 gap-4 ml-2">
        <p className="text-xl font-semibold text-white">Your Code Up Panel</p>
        <p className="text-lg font-semibold text-white">
          {numberOfContributions} contributions
        </p>
      </div>
      <div className="p-6 bg-[#0d1117] border border-[#30363d] rounded-lg w-[82%]">
        <div className="flex flex-col gap-4 text-sm text-[#7d8590] min-w-max">
          <div className="ml-10 flex gap-[4px]">
            {weeks.map((week, i) => (
              <div key={i} className="w-[13px] text-center">
                {i === 0 ||
                getMonthLabel(week[0]) !== getMonthLabel(weeks[i - 1][0])
                  ? getMonthLabel(week[0])
                  : ''}
              </div>
            ))}
          </div>

          <div className="flex">
            <div className="flex flex-col justify-between mr-3 h-[105px] text-[12px]">
              <span style={{ lineHeight: '13px' }}>Mon</span>
              <span style={{ lineHeight: '13px' }}>Wed</span>
              <span style={{ lineHeight: '13px' }}>Fri</span>
            </div>
            <div className="flex gap-[4px]">
              {weeks.map((week, i) => (
                <div key={i} className="flex flex-col gap-[4px]">
                  {week.map((day, j) => (
                    <div
                      key={j}
                      className={`w-[13px] h-[13px] rounded-sm cursor-pointer transition-colors ${
                        isActive(day)
                          ? 'bg-[#00d4aa] hover:bg-[#00b894]'
                          : 'bg-[#161b22] hover:bg-[#1c2128]'
                      }`}
                      onMouseEnter={e => {
                        handleMouseEnter(day, e)
                      }}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={handleMouseMove}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {hoveredDate && (
          <div
            className="fixed z-50 bg-[#21262d] border border-[#30363d] rounded-md px-2 py-1 text-xs text-white shadow-lg pointer-events-none"
            style={{
              left: mousePosition.x + 10,
              top: mousePosition.y - 40
            }}
          >
            {isActive(hoveredDate) ? '1 contribution' : 'No contributions'} on{' '}
            {format(hoveredDate, 'MMM d, yyyy')}
          </div>
        )}
      </div>
    </div>
  )
}
