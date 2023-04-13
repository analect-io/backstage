# Backstage Documentation

This is a basic example of documentation. Adding another sentence.

![techdocs architecture svg](./images/architecture-basic.drawio.svg)

Try a PlantUML rendering:

<!--
@startuml
rectangle cool-service {
    database mongodb   [
               \t<b>mongodb for storing data
            ----
            <b>app.kubernetes.io/part-of :</b>cool-service
            <b>app.kubernetes.io/name :</b> mongodb
            <b>app.kubernetes.io/component :</b> database
            <b>app.kubernetes.io/managed-by :</b> odo
            <b>app.kubernetes.io/version :</b> 3.6
        ]
    rectangle nodejs   [
            \t\t<b>The node.js service with code</b>
            ----
            <b>app.kubernetes.io/part-of :</b> cool-service
            <b>app.kubernetes.io/name :</b> nodejs
            <b>app.kubernetes.io/component :</b> frontend
            <b>app.kubernetes.io/managed-by :</b> odo
            <b>app.kubernetes.io/version</b> : 1.0.1
            <b>app.openshift.io/runtime</b>: nodejs
            <b> app.openshift.io/runtime-version</b>: 10.14.1
            ----
            <b>app.openshift.io/vcs-uri :</b> git://git@github.com:gorkem/cool-service.git
            <b>app.openshift.io/vcs-ref :</b> master
            <b>app.openshift.io/connects-to :</b> mongodb

        ]
    mongodb <-- nodejs

}

@enduml
-->
