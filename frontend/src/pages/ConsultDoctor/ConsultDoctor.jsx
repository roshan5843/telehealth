import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useAuth } from '../../context/AuthContext'

const ConsultDoctor = () => {
  const { roomId } = useParams()
  const { user } = useAuth()
  const meetingRef = useRef(null)

  useEffect(() => {
    const myMeeting = async (element) => {
      const appID = 35025124
      const serverSecret = 'e5ed6a8e59f41c44eb0648878eb81492'
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        user?.name || 'guest'
      )
      const zc = ZegoUIKitPrebuilt.create(kitToken)
      zc.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Copy Link',
            url: `http://localhost:5173/room/${roomId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
      })
    }

    if (meetingRef.current) {
      myMeeting(meetingRef.current)
    }
  }, [roomId, user])

  return <div ref={meetingRef} />
}

export default ConsultDoctor
