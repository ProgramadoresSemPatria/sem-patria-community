import { type SVGProps } from 'react'

export type CustomSvgProps = SVGProps<SVGSVGElement> & {
  width?: number
  height?: number
  fill?: string
  stroke?: string
}

type IconCourseBeginnerLevelProps = CustomSvgProps & {
  barColor?: string
}

type IconCourseIntermediateLevelProps = CustomSvgProps & {
  barColor?: string
}

type IconCourseAdvancedLevelProps = CustomSvgProps & {
  barColor?: string
}

function IconCourseBeginnerLevel({
  width = 16,
  height = 17,
  barColor = '#29E0A9',
  ...props
}: IconCourseBeginnerLevelProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M4.13 6.85H2.88a.625.625 0 00-.625.625v4.75c0 .345.28.625.625.625h1.25c.346 0 .625-.28.625-.625v-4.75a.625.625 0 00-.625-.625z"
          fill={barColor}
          stroke={barColor}
        />
        <path
          d="M8.63 5.35H7.38a.625.625 0 00-.625.625v6.25c0 .345.28.625.625.625h1.25c.346 0 .625-.28.625-.625v-6.25a.625.625 0 00-.625-.625zM13.12 3.35h-1.25a.625.625 0 00-.625.625v8.25c0 .345.28.625.625.625h1.25c.345 0 .625-.28.625-.625v-8.25a.625.625 0 00-.625-.625z"
          fill="#505059"
          stroke="#505059"
        />
      </g>
    </svg>
  )
}

function IconCourseIntermediateLevel({
  width = 16,
  height = 17,
  barColor = '#29E0A9',
  ...props
}: IconCourseIntermediateLevelProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.13 6.85H2.88a.625.625 0 00-.624.625v4.75c0 .345.28.625.625.625h1.25c.345 0 .625-.28.625-.625v-4.75a.625.625 0 00-.625-.625zM8.63 5.35H7.38a.625.625 0 00-.624.625v6.25c0 .345.28.625.625.625h1.25c.345 0 .625-.28.625-.625v-6.25a.625.625 0 00-.625-.625z"
        fill={barColor}
        stroke={barColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.12 3.35h-1.25a.625.625 0 00-.626.625v8.25c0 .345.28.625.625.625h1.25c.346 0 .625-.28.625-.625v-8.25a.625.625 0 00-.625-.625z"
        fill="#505059"
        stroke="#505059"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconCourseAdvancedLevel({
  width = 16,
  height = 16,
  barColor = '#29E0A9',
  ...props
}: IconCourseAdvancedLevelProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill={barColor}
        stroke={barColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.13 6.75H2.88a.625.625 0 00-.624.625v4.75c0 .345.28.625.625.625h1.25c.345 0 .625-.28.625-.625v-4.75a.625.625 0 00-.625-.625zM8.63 5.25H7.38a.625.625 0 00-.624.625v6.25c0 .345.28.625.625.625h1.25c.345 0 .625-.28.625-.625v-6.25a.625.625 0 00-.625-.625zM13.12 3.25h-1.25a.625.625 0 00-.626.625v8.25c0 .345.28.625.625.625h1.25c.346 0 .625-.28.625-.625v-8.25a.625.625 0 00-.625-.625z" />
      </g>
    </svg>
  )
}

export {
  IconCourseAdvancedLevel,
  IconCourseBeginnerLevel,
  IconCourseIntermediateLevel
}
