package com.simulator.allround.repository

import com.simulator.allround.handler.HttpRequest
import org.springframework.data.repository.reactive.ReactiveCrudRepository

interface HttpRequestConfMongoRepository : ReactiveCrudRepository<HttpRequest, String> {

}