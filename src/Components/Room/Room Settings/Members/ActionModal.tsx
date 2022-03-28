import { useState, useEffect, FC, useRef} from 'react'
import { motion } from "framer-motion"
import { useSelector } from 'react-redux'
import "./style/action_style.css"
import { ActionType } from "./MemberList"

interface ActionModalProps {
  username: string;
  client_id: string
  type: ActionType["type"],
  cancelModal: () => void
}

const ActionModal: FC<ActionModalProps> = ({ username, client_id, type, cancelModal }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [appear, setAppear] = useState<boolean>(false);
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

  const variants = {
    visible: { opacity: appear ? 1 : 0, y: appear ? 0 : 50 },
    hidden: { opacity: 0, y: appear ? 0 : 80 },
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      setAppear(true);
    }, 1);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='modal_container'>
      <motion.div className={darkTheme ? "modal_accept dark" : "modal_accept"}
        ref={modalRef}
        variants={variants}
        animate="visible"
        transition={{ ease: "easeOut", duration: 0.4 }}
        initial="hidden">
        <div className="action__title">
          {type === "BAN" && <h2>Ban {username} from room</h2>}
          {type === "KICK" && <h2>Kick {username} from room</h2>}
          {type === "OWNERSHIP" && <h2>Transfer ownership to {username}</h2>}
        </div>
        <div className="warn-before-action">
          Are you sure you want to
          {type === "BAN"
            ? <span className='important ban'>{" "}ban</span>
            : type === "KICK"
              ? <span className='important kick'>{" "}kick</span>
              : <span className='important'>{" "}transfer ownership</span>} to {username}?
          <br />
          {type === "KICK" && "They will be able to rejoin with same invite link btw"}
          {type === "BAN" && `${username} won't be able to join in the room, if you won't unban`}
          {type === "OWNERSHIP" && `if you will give ownership to ${username} actions won't be undone, unless ${username} won't give you it back`}
        </div>
        <div className="accept_actions-container">
          <button className="action-btn" onClick={cancelModal}>Cancel</button>
          <button className={`action-btn ${type === "BAN" ? "ban" : "light"}`}>
            {type === "BAN" && "Ban"}
            {type === "KICK" && "Kick"}
            {type === "OWNERSHIP" && "Transfership"}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ActionModal