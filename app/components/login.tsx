import styles from "./login.module.scss";
import ChatGptIcon from "../icons/loginlogo.svg";
import axios from "axios";
import { useLoginStore } from "../store";
import { useState } from "react";

export function Login() {
    const [userName, setUseName] = useState('')
    const [passWord, setPassWord] = useState('')
    const [invitationCode, setInvitationCode] = useState('')
    const [isLogon, setIsLogon] = useState<boolean>(false)
    const [updateUser] = useLoginStore((state) => [state.updateUser])

    const goLogon = () => {
        setUseName('')
        setPassWord('')
        setIsLogon(!isLogon)
    }
    const onFinish = async () => {
        if (!userName && !passWord) return
        if (isLogon) {
            const res = await axios.post('http://chattok.miquanbao.com:3001/users/addUser', {
                name: userName,
                password: passWord,
                invitationCode
            })

            if (res.status === 200) {
                goLogon()
                return
            }
            return
        }
        const res = await axios.post('http://chattok.miquanbao.com:3001/users/login', {
            userName: userName,
            password: passWord
        })

        if (res.status === 200) {
            updateUser(res.data.token)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <ChatGptIcon />
            </div>
            <div className={styles.label}>账号</div>
            <input className={styles.input} value={userName} onChange={(e) => setUseName(e.target.value)} ></input>
            <div className={styles.label}>密码</div>
            <input className={styles.input} type="password" value={passWord} onChange={(e) => setPassWord(e.target.value)}></input>
            {isLogon && <>
                <div className={styles.label}>邀请码</div>
                <input className={styles.input} value={invitationCode} onChange={(e) => setInvitationCode(e.target.value)} ></input>
            </>}
            <button className={styles.button} onClick={onFinish} >{isLogon ? '注册' : '登录'}</button>
            <div className={styles.logon} onClick={goLogon}>{!isLogon ? '去注册' : '去登录'}</div>
        </div>
    )
}